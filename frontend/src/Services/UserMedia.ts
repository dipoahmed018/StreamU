interface Options {
    constraints: Object,
    onError: Function
}

class UserMedia {
    private options: Options = {
        onError: () => { },
        constraints: {
            video: true,
            audio: true,
        }
    };
    public stream: MediaStream | null = null;

    constructor(options: object = {}) {
        this.options = { ...this.options, ...options }
    }

    async getPermission() {
        try {
            const stream: MediaStream = await navigator.mediaDevices.getUserMedia(this.options.constraints)
            this.stream = stream
            return stream
        } catch (error) {
            this.options.onError(error)
            throw error;
        }
    }

    stop(): void {
        this.stream?.getTracks().forEach(track => track.stop())
    }
}

export default UserMedia