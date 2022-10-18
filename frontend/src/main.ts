import Stream, { Status } from "./Services/Stream"




const streamView: HTMLVideoElement = document.getElementById('stream-view') as HTMLVideoElement
const streamStarted = (stream: MediaStream) => {
  streamView.srcObject = stream
}

const startStreamBtn = document.getElementById('start-stream')
const stream1 = new Stream({
  onStreamStarted: streamStarted
});

startStreamBtn?.addEventListener('click', () => stream1.startStreaming())
