import express, { Express, Request, Response } from 'express';
import { WebSocketServer } from 'ws'
import StreamRepository, { StreamDataType } from './app/models/Streams'
import dotenv from 'dotenv';
import { startStream } from './app/controller/StreamController';
import { cors } from "./app/middleware/cors";

dotenv.config();

const port = process.env.PORT;
const debug = require('debug')('StreamU')
const app: Express = express();
app.use(cors)
const storage = app.use('/streams', express.static('storage/streams'))
const ws = require('ws')

app.use('/', (req: Request, res: Response) => {
    res.send('welcome to my little expriment')
})


const wsServer: WebSocketServer = new ws.Server({ noServer: true });
const streams = StreamRepository.getInstance()


const server = app.listen(port, () => {
    debug(`[server]: Server is running at https://localhost:${port}`)
});


//Handeling server updgrade request

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (ws) => {
        wsServer.emit('connection', ws, request);
    });
})

wsServer.on('connection', (ws) => {
    ws.on('message', (data: string) => {
        ws.send(startStream(JSON.parse(data)))
    })
})