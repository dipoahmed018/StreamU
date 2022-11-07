import { spawn } from "child_process"
import StreamRepository, { StreamInformation } from "../models/Streams";

export const startStream = (data: string, streamId: string): string => {

    const Streams = StreamRepository.getInstance();
    const { FFmpegProcess: { stdin, stderr }, id }: StreamInformation = Streams.getOrCreateStream(streamId)

    const buffer = Buffer.from(data, 'base64')
    stdin.write(buffer)
    stderr.on('data', (message) => {
        
    })
    return streamId;
}