import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { randomUUID } from 'crypto';
import { appendFile, existsSync, mkdirSync } from 'node:fs';

export interface StreamInformation {
    id: string,
    url: string,
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

        const url = `${process.env.APP_URL}:${process.env.PORT}/streams/${id}/stream.m3u8`
        const path = process.env.ROOT_DIR + `/storage/streams/${id}`

        if (!existsSync(path)) {
            mkdirSync(path, { recursive: true })
        }

        const streamProcess = spawn('ffmpeg', [
            '-i', '-',
            // '-re',
            '-fflags', '+igndts',

            '-vcodec', 'h264',
            '-acodec', 'aac',

            '-preset', 'slow',
            '-crf', '22',
            // You can also use QP value to adjust output stream quality, e.g.: 
            // '-qp', '0',
            // You can also specify output target bitrate directly, e.g.:
            '-b:v', '1500K',
            '-b:a', '128K', // Audio bitrate

            '-f', 'hls',
            '-hls_time', '2',
            // '-hls_playlist_type', 'vod',
            '-hls_list_size', '2',
            '-hls_flags', 'independent_segments',
            '-hls_segment_type', 'mpegts',
            '-hls_segment_filename', `${path}/stream%02d.ts`, `${path}/stream.m3u8`,
        ]);

        streamProcess.stderr.on('data', (data) => {
            appendFile(`${process.env.ROOT_DIR}/storage/logs/node.log`, data, (done) => {
                console.log(done)
            })
        })

        const streamInfo: StreamInformation = { id, url, FFmpegProcess: streamProcess };
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

