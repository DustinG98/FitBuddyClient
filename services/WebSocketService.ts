import { Action, EnhancedStore } from "@reduxjs/toolkit"
import { ActionTypes } from "../redux/types/websocket"
import { getUserIdFromToken } from "../utils"

export class Socket {
    _instance: WebSocket | undefined
    connected: boolean
    token: any

    store: EnhancedStore

    subscriptions: {[id:string]: CallableFunction[]}
    constructor(store: EnhancedStore<any, Action, any>) {
        this.store = store
        this.subscriptions = {}
        this.connected = false
    }

    open(token: string) {
      this.token = token;
      const url = process.env.EXPO_PUBLIC_WEBSOCKET_ADDRESS + '?token=' + token;
      this._instance = new WebSocket(url);
      this._instance.onopen = this.onOpen.bind(this)
      this._instance.onclose = this.onClose.bind(this)
      this._instance.onmessage = this.onMessage.bind(this)
    }

    subscribe(event:string, cb: CallableFunction) {
        this.subscriptions[event] = this.subscriptions[event] && this.subscriptions[event].length > 0 ? [...this.subscriptions[event].filter(it=>it!==cb), cb] : [cb]
    }

    unsubscribe(event:string, cb: CallableFunction) {
        this.subscriptions[event] = this.subscriptions[event] && this.subscriptions[event].length > 1 ? [...this.subscriptions[event].filter(it=>it!==cb)] : []
    }

    send(action: string, data:any) {
      this._instance?.send(JSON.stringify({action, data}))
    }
    
    close () {
      this._instance?.close()
    }
    private onOpen() {
      this.store.dispatch({ type: ActionTypes.CONNECTED })
      this.connected = true
    }
    
    private onClose() {
      this.store.dispatch({ type: ActionTypes.DISCONNECTED })
      this.connected = false
    }
    
    private onMessage (event: any) {
        console.log({event})
        if(typeof event.data === 'string') {
          const data = JSON.parse(event.data)
          const _event: keyof typeof ActionTypes = data.event
          const action = ActionTypes[_event]
          if(!action) return
          const userId = getUserIdFromToken(this.token)
          this.store.dispatch({ type: action, payload: data.data, userId })
        }
    }
}
