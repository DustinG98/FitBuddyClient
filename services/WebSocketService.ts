
export class WebSocketService {
    connected: boolean = false;
    private socket: WebSocket;
    private messageHandlers: ((message: string) => void)[] = [];

    constructor(token: string) {
        const url = process.env.EXPO_PUBLIC_WEBSOCKET_ADDRESS + '?token=' + token;
        console.log('Connecting to websocket at ' + url);
        this.socket = new WebSocket(process.env.EXPO_PUBLIC_WEBSOCKET_ADDRESS + '?token=' + token);
        this.socket.onopen = this.handleOpen.bind(this);
        this.socket.onclose = this.handleClose.bind(this);
        this.socket.onerror = this.handleError.bind(this);
        this.socket.addEventListener('message', this.handleMessage.bind(this));
    }

    private handleOpen() {
        console.log('Connected to websocket');
        this.connected = true;
    }

    private handleError(err: any) {
        this.connected = false;
        console.log({err})
    }

    private handleClose(e: any) {
        this.connected = false;
        console.log({e})
    }

    close() {
        this.socket.close();
        this.connected = false;
    }

    private handleMessage(event: WebSocketMessageEvent) {
        const message = event.data as string;
        this.messageHandlers.forEach(handler => handler(message));
    }

    public subscribe(handler: (message: string) => void) {
        this.messageHandlers.push(handler);
    }

    public unsubscribe(handler: (message: string) => void) {
        const index = this.messageHandlers.indexOf(handler);
        if (index !== -1) {
        this.messageHandlers.splice(index, 1);
        }
    }
}
