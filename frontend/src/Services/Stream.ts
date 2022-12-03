import UserMedia from "./UserMedia";
import WS from './Websocket';
import { v4 as uuid } from 'uuid'
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

    private streamID: string;
    public status = INACTIVE
    public listeners: Listeners = {
        onStreamCompleted: () => { },
        onStreamPaused: () => { },
        onStreamStarted: () => { },
        onError: () => { },
    }
    private recorder: MediaRecorder | null = null;
    private WsServer: WS;

    constructor(serverEndPoint: string, providedListeners: Object = {}) {
        super()
        this.WsServer = WS.getOrCreateConnection(serverEndPoint)
        this.listeners = { ...this.listeners, ...providedListeners }
        this.streamID = uuid();
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
        this.recorder.start(3000)
        this.recorder.ondataavailable = (e: BlobEvent) => this.uploadStreamToServer(e)
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

    private async uploadStreamToServer(event: BlobEvent) {
        const reader = new FileReader()
        reader.readAsDataURL(event.data)
        reader.onload = () => {
            const data = {
                streamID: this.streamID,
                data: reader.result
            }
            this.WsServer.send(JSON.stringify(data))
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