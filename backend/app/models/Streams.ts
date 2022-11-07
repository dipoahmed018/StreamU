import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { randomUUID } from 'crypto';

export interface StreamInformation {
    id: string,
    FFmpegProcess: ChildProcessWithoutNullStreams;
}

export interface StreamDataType {
    stream: string,
    streamId: string,
}

export default class StreamRepository {
    private data: Array<StreamInformation> = [];
    private static insatance: StreamRepository | null = null;

    constructor(streams: Array<StreamInformation> = []) {
        this.data = streams
    }

    public getStreamProcess(id: string): StreamInformation | undefined {
        return this.data.find(item => item.id == id)
    }

    public deleteStreamProcess(id: string): Array<StreamInformation> | undefined {
        const index = this.data.findIndex(item => item.id == id)
        if (index !== -1) {
            return this.data.splice(index, 1);
        }
        return undefined;
    }

    public getOrCreateStream(id: string = randomUUID()): StreamInformation {
        const existingStream = this.data.find(streamInfo => streamInfo.id == id)
        if (existingStream)
            return existingStream;

        const streamProcess = spawn('ffmpeg', [
            '-i', '-',
            '-re',
            '-fflags', '+igndts',

            '-vcodec', 'copy',
            '-acodec', 'copy',

            '-preset', 'slow',
            '-crf', '22',
            // You can also use QP value to adjust output stream quality, e.g.: 
            // '-qp', '0',
            // You can also specify output target bitrate directly, e.g.:
            '-b:v', '1500K',
            '-b:a', '128K', // Audio bitrate

            '-f', 'hls',
            '-hls_time', '2',
            '-hls_playlist_type', 'vod',
            '-hls_flags', 'independent_segments',
            '-hls_segment_type', 'mpegts',
            '-hls_segment_filename', `/home/dipo/Videos/${id}/stream%02d.ts`, `${id}.m3u8`,
        ]);
        const streamInfo: StreamInformation = { id, FFmpegProcess: streamProcess };
        this.data.push(streamInfo)
        return streamInfo;
    }

    public static getInstance() {
        if (StreamRepository.insatance)
            return StreamRepository.insatance

        StreamRepository.insatance = new StreamRepository()
        return StreamRepository.insatance
    }
}