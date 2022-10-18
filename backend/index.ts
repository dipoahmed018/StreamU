import express, { Express, Request, response, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const debug = require('debug')('StreamU')

const streamRoutes = require('./routes/Stream');

const app: Express = express();

app.use('/', (req: Request, res: Response) => {
    res.send('welcome to my little expriment')
})

app.use('/stream', streamRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    debug(`[server]: Server is running at https://localhost:${port}`)
});