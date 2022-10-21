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

            this.listeners.onError(error)
        }
    }


    finishStream() {
        this.stop()
        this.status = COMPLETED
        this.listeners.onStreamCompleted()
        //do stuff later
    }
}

export const Status = {
    PLAYING,
    INACTIVE,
    PAUSED,
    COMPLETED
}

export default Stream