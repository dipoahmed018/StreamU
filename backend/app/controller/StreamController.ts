import { spawn } from "child_process"

export const startStream = (data: Blob) => {
    // const { stdout, stdin, stderr } = spawn('ffmpeg', [
    //     '-i', '-',
    //     '-re',
    //     '-fflags', '+igndts',

    //     '-vcodec', 'copy',
    //     '-acodec', 'copy',

    //     '-preset', 'slow',
    //     '-crf', '22',
    //     // You can also use QP value to adjust output stream quality, e.g.: 
    //     // '-qp', '0',
    //     // You can also specify output target bitrate directly, e.g.:
    //     '-b:v', '1500K',
    //     '-b:a', '128K', // Audio bitrate

    //     '-f', 'hls',
    //     '-hls_time', '2',
    //     '-hls_playlist_type', 'vod',
    //     '-hls_flags', 'independent_segments',
    //     '-hls_segment_type', 'mpegts',
    //     '-hls_segment_filename', '/hode/dipo/Videos/stream%02d.ts', 'stream.m3u8',
    // ]);

    // stdout.on('data', (data) => {
    //     // console.log(data)
    // })

    // stderr.on('data', data => {
    //     console.log(data.toString())
    // })
    return false;
}