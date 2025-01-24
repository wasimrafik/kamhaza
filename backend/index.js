import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

const app = express()

const PORT = process.env.PORT || 8001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


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
