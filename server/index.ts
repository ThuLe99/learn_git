import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import routes from './routes/index'
import { createServer } from "http";
import { Socket, Server } from 'socket.io'
import {SocketServer} from './config/socket'
// Middleware
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

// Routes
app.use('/api', routes.authRouter)
app.use('/api', routes.userRouter)
app.use('/api', routes.categoryRouter)
app.use('/api', routes.blogRouter)
app.use('/api', routes.adminRouter)
app.use('/api', routes.commentRouter)
app.use('/api', routes.messageRouter)
app.use('/api', routes.chartRouter)
// Database
import './config/database'
//socket
const http = createServer(app)
export const io = new Server(http) 
io.on("connection", (socket: Socket) =>SocketServer(socket))


// server listenning
const PORT = process.env.PORT || 5000
http.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})

// em nheo anh eo yeu e nham 
