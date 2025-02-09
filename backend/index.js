import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { Server } from "socket.io";
import http from "http";


const app = express()

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
})

// Log when a client connects or disconnects
io.on("connection", (socket) => {
    console.log("Client connected: " + socket.id);
  
    socket.on("disconnect", () => {
      console.log("Client disconnected: " + socket.id);
    });
  });

  // Make Socket.io instance accessible in your controllers via app.locals or similar
app.set("socketio", io);


// Start the server
const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


mongoose
.connect('mongodb://127.0.0.1:27017/Kamhaza')
.then(() => console.log("Database connected"))

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(cookieParser())
app.use(express.json({limit: '50kb'}))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static('public'))


import userRouter from './router/user.router.js'
import productRouter from './router/product.router.js'
import categoryRouter from './router/category.router.js'
import messageRouter from './router/message.router.js'
import addToBookmarkRouter from './router/addToBookmark.router.js'
import locationRouter from './router/location.router.js'
import notificationRouter from './router/notification.router.js'
import transactionRouter from './router/transaction.router.js'

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/category', categoryRouter)
app.use('/api/message', messageRouter)
app.use('/api/bookmark', addToBookmarkRouter)
app.use('/api/location', locationRouter)
app.use('/api/notification', notificationRouter)
app.use('/api/transaction', transactionRouter)