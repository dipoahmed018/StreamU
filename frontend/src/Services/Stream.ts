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

    public serverEndPoint: String
    public status = INACTIVE
    public listeners: Listeners = {
        onStreamCompleted: () => { },
        onStreamPaused: () => { },
        onStreamStarted: () => { },
        onError: () => { },
    }
    private recorder: MediaRecorder | null = null;

    constructor(serverEndPoint: String, providedListeners: Object = {}) {
        super()
        this.serverEndPoint = serverEndPoint
        this.listeners = { ...this.listeners, ...providedListeners }
    }

    async startStreaming() {
        try {
            const stream: MediaStream = await this.getPermission()
            this.listeners.onStreamStarted(stream)
            this.startRecording(stream)

            this.status = PLAYING;
        } catch (error) {

            this.listeners.onError(error)
        }
    }


    finishStream() {
        this.status = COMPLETED
        this.listeners.onStreamCompleted()
        this.stop()
        this.stopRecording()
    }


    /**
     * Start Recording Stream
     * 
     */
    private startRecording(stream: MediaStream): void {

        this.recorder = new MediaRecorder(stream)
        this.recorder.start(5000)
        this.recorder.ondataavailable = this.uploadStreamToServer
    }

    /**
     * Stop Recording Stream
     * 
     */

    private stopRecording() {
        this.recorder?.stop()
    }

    /**
     * Upload Stream To Server
     * 
     */

    async private uploadStreamToServer(event: MediaStream) {
        try {
            const res = await fetch(this.serverEndPoint)
            
        } catch (error) {
            
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