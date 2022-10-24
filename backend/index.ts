import express, { Express, Request, Response } from 'express';
import {WebSocketServer} from 'ws'
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;
const debug = require('debug')('StreamU')
const app: Express = express();
const ws = require('ws')



app.use('/', (req: Request, res: Response) => {
    res.send('welcome to my little expriment')
})
app.use('/stream', require('./routes/Stream'));


const wsServer: WebSocketServer = new ws.Server({ noServer: true });


const server = app.listen(port, () => {
    debug(`[server]: Server is running at https://localhost:${port}`)
});


//Handeling server updgrade request

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (ws) => {
        wsServer.emit('connection', ws, request);
    });
})

wsServer.on('connection', () => {
    console.log('Client Connected')
})
