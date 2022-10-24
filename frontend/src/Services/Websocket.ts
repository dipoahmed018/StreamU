class Ws {
    public config = {
        'endPoint': 'http://127.0.0.1:3000',
        'authCredentials': {},
    }
    constructor(config: Object = {}) {
        this.config = {...config, ...this.config}
    }
}

export default Ws