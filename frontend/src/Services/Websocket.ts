class Ws {
    private WSConnection: WebSocket;
    public config: Object = {
        'authCredentials': {},
    }

    constructor(endPoint: string = 'ws://127.0.0.1:3000', config: Object = {}) {

        this.config = { ...config, ...this.config }
        this.WSConnection = new WebSocket(endPoint)
    }

    public send = (data: string) => {
        this.WSConnection.send(data)
    }
}

export default Ws