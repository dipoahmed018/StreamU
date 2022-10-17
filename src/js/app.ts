import express, { Express, Request, Response } from 'express'

//env
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

//routers
const streamRoutes = require('./routes/stream')
const webRoutes = require('./routes/web')

const debug = require('debug')(process.env.DEBUG)

const root = path.join(__dirname, '/../../')


const app: Express = express()
const port = process.env.PORT


app.use(express.static(path.join(root, 'public')));

app.set('views', path.join(root, 'src/views'))
app.set('view engine', 'pug')

app.use('/stream', streamRoutes)
app.use('/', webRoutes)

app.listen(port, () => {
  debug(`listening to http://${process.env.HOST}:${process.env.PORT}`)
})
