require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const SocketServer = require('./socketServer')
const { ExpressPeerServer } = require('peer')


const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(express.static('public'))



const http = require('http').createServer(app)
const io = require('socket.io')(http)

// Поднимаем сокеты
io.on('connection', socket => {
    SocketServer(socket)
})

ExpressPeerServer(http, { path: '/' })


app.use('/api', require('./routes/appealRouter'))
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/userRouter'))
app.use('/api', require('./routes/postRouter'))
app.use('/api', require('./routes/commentRouter'))
app.use('/api', require('./routes/notifyRouter'))
app.use('/api', require('./routes/messageRouter'))


mongoose.connect('mongodb://0.0.0.0:27017/dev', {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Связь с MongoDb подключена.')
})

// Поднимаем прослушивателя express по порту
http.listen(process.env.PORT, () => {
    console.log('Сервер запущен на порту ', process.env.PORT)
})