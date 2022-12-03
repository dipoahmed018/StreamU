import Stream, { Status } from "./Services/Stream"
import Ws from "./Services/Websocket"
import videojs from 'video.js'
const streamsURL: Array<string> = [];

const streamView: HTMLVideoElement = document.getElementById('stream-view') as HTMLVideoElement
const streamStarted = (stream: MediaStream) => {
  streamView.srcObject = stream
}

const streamContainer = document.getElementById('streams-container')
const startStreamBtn = document.getElementById('start-stream')
const finishStreamBtn = document.getElementById('finish-stream')

const stream1 = new Stream('ws://127.0.0.1:3001', {
  onStreamStarted: streamStarted
});

const WS = Ws.getOrCreateConnection()
WS.WSConnection?.addEventListener('message', (e: MessageEvent) => {
  const { data: streamURL } = e
  if (!streamsURL.includes(streamURL)) {
    streamsURL.push(streamURL)
    addNewStream(streamURL)
  }
})

const addNewStream = (url: string) => {
  const videoElement = document.createElement('video')
  streamContainer?.appendChild(videoElement)
  const player = videojs(videoElement)
  player.addClass("video-js vjs-theme-sea")
  player.src(url)
}

startStreamBtn?.addEventListener('click', () => stream1.startStreaming())
finishStreamBtn?.addEventListener('click', () => stream1.finishStream())

fetch('http://127.0.0.1:3001/streams/stream.txt', {
  method: 'get',
}).then(res => {
  console.log(res)
})