import Stream, { Status } from "./Services/Stream"




const streamView: HTMLVideoElement = document.getElementById('stream-view') as HTMLVideoElement
const streamStarted = (stream: MediaStream) => {
  streamView.srcObject = stream
}

const startStreamBtn = document.getElementById('start-stream')
const finishStreamBtn = document.getElementById('finish-stream')

const stream1 = new Stream('http://127.0.0.1:.3000/stream', {
  onStreamStarted: streamStarted
});

startStreamBtn?.addEventListener('click', () => stream1.startStreaming())
finishStreamBtn?.addEventListener('click', () => stream1.finishStream())
