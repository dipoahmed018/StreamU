import UserMedia from "./UserMedia";

interface Listeners {
    onStreamStarted: Function,
    onStreamPaused: Function,
    onStreamCompleted: Function,
    onError: Function,
}

const PLAYING = '1';
const INACTIVE = '0';
const PAUSED = '3';
const COMPLETED = '4';



class Stream extends UserMedia {
    public status = INACTIVE
    public listeners: Listeners = {
        onStreamCompleted: () => { },
        onStreamPaused: () => { },
        onStreamStarted: () => { },
        onError: () => { },
    }

    constructor(providedListeners: Object = {}) {
        super()
        this.listeners = { ...this.listeners, ...providedListeners }
    }

    async startStreaming() {
        try {
            const stream: MediaStream = await this.getPermission()
            this.listeners.onStreamStarted(stream)
        } catch (error) {
            console.log(this)

            this.listeners.onError(error)
        }
    }
}

export const Status = {
    PLAYING,
    INACTIVE,
    PAUSED,
    COMPLETED
}

export default Stream