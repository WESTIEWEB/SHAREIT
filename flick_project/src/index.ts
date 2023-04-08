import express, {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from 'morgan';
import path from 'path';
import http from 'http';
import { dbConnection } from './database';
import userRoute from './routes/users-route';
import chatEngineRoute from './routes/chat-engine.route';

const socketIo = require('socket.io');

dotenv.config();
const app = express()
const DB_URL = process.env.DB_URI || 'mongodb://localhost:27017/ecommerce';
try{
    dbConnection(DB_URL);
} catch(err) {
    console.log(err)
}

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname, '../public')));

app.use('/users', userRoute);
app.use('/chat-engine', chatEngineRoute);
// app.use('/', (req, res) => {
//     res.send('hello')
// })

const port = process.env.port || 3000 
const server = http.createServer(app)
server.listen(port, ()=> {
    console.log(`server is listening on: ${port}`)
})

const socketOptions = {
  path: '/socket.io',
  transports: ['websocket'],
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
};

export const io = socketIo(server, socketOptions)
let socketsConnected = new Set();

io.on('connection', onConnected);

function onConnected(socket:any) {
  console.log('Socket connected', socket.id);
  socketsConnected.add(socket.id);
  io.emit('clients-total', socketsConnected.size);

  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id);
    socketsConnected.delete(socket.id);
    io.emit('clients-total', socketsConnected.size);
  });

  socket.on('message', (data:any) => {
    socket.broadcast.emit('chat-message', data);
  });

  socket.on('feedback', (data:any) => {
    socket.broadcast.emit('feedback', data);
  });
}

export default app;