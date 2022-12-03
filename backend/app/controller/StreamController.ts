import { appendFile } from "fs";
import StreamRepository, { StreamInformation } from "../models/Streams";

interface StreamData {
    streamID: string,
    data: string,
}

export const startStream = (stream: StreamData): string => {
    const Streams = StreamRepository.getInstance();
    const { FFmpegProcess: { stdin, stderr }, id, url }: StreamInformation = Streams.getOrCreateStream(stream.streamID)
    const buffer =  Buffer.from(stream.data.replace(/^data:.+;base64,/, ''), 'base64');
    stdin.write(buffer)
    return url;
}