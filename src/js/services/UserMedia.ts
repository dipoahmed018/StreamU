interface Config {
    onError: (error: any) => void;
    onPermissionGranted: () => void;
}
type errorCallback = (param: any) => void;

const initialConfig = {
    onError: () => { },
    onPermissionGranted: () => { }
}

class UserMedia {
    private option: Object;
    public stream: MediaStream | null = null;
    private config: Config;


    constructor(option: Object = {}, config: Object = initialConfig) {
        this.option = option
        this.config = { ...initialConfig, ...config }
    }

    async getPermission() {
        try {
            const stream: MediaStream = await navigator.mediaDevices.getUserMedia(this.option)
            this.stream = stream
            this.config.onPermissionGranted()
        } catch (error) {
            this.config.onError(error)
        }
    }

    stop(): void {
        this.stream?.getTracks().forEach(track => track.stop());
    }
}