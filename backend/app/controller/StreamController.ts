import { spawn } from "child_process"
import StreamRepository, { StreamInformation } from "../models/Streams";

export const startStream = (data: string, streamId: string): string => {

    const { FFmpegProcess: { stdin, stderr }, id }: StreamInformation = new StreamRepository().getOrCreateStream(streamId)

    const buffer = Buffer.from(data, 'base64')
    stdin.write(buffer, (err) => {
        console.log('error:', [err])
    })

    stderr.on('data', data => {
        // console.log(data.toString())
    })
    return streamId;
}