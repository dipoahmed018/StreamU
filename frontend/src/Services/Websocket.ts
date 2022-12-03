export default class Ws {
    private static instance: Ws | null = null
    public readonly WSConnection: WebSocket | undefined = undefined;
    public config: Object = {
    }

    constructor(endPoint: string = 'ws://127.0.0.1:3001', config: Object = {}) {
        this.config = { ...config, ...this.config }
        this.WSConnection = new WebSocket(endPoint)
    }

    public send(data: string | Blob) {
        this.WSConnection?.send(data)
    }

    public static getOrCreateConnection(endPoint: string = 'ws://127.0.0.1:3001', config: Object = {}): Ws {
        if (!Ws.instance) {
            Ws.instance = new Ws(endPoint, config)
        }
        return Ws.instance
    }
}
