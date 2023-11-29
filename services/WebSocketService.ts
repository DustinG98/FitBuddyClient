export class Socket {
    _instance: WebSocket | undefined
    connected: boolean
    IdToken: any

    subscriptions: {[id:string]: CallableFunction[]}
    constructor(token: string) {
        const url = process.env.EXPO_PUBLIC_WEBSOCKET_ADDRESS + '?token=' + token;
        this.subscriptions = {}
        this.connected = false
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
      this.connected = true
      this.send('connected', { IdToken: this.IdToken })
    }
    
    private onClose() {
      this.connected = false
    }

    private notifySubscribers(event:string, data:any) {
      if(this.subscriptions[event] && this.subscriptions[event].length > 0) {
        this.subscriptions[event].forEach(it => it(data))
      }
    }

    private onMessage (event: any) {
        if(typeof event.data === 'string') {
          const data = JSON.parse(event.data)
          this.notifySubscribers(data.event, data.data)
        }
    }
}
