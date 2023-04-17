import express, {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from 'morgan';
import path from 'path';
import http from 'http';
import { dbConnection } from './database';
import userRoute from './user/routes/users-route';
import adminRoute from './admin/routes/admin-routes';
import chatEngineRoute from './chat/routes/chat-engine.route';
import { ChatInstance } from './model/chat';
import { newChatSchema, options } from './utils';
import { error } from 'console';
import { getMessages } from './chat/services';

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

app.use('/api/v1/users', userRoute);
app.use('/api/v1/chat-engine', chatEngineRoute);
app.use('/api/v1/admin', adminRoute);
// app.use('/', (req, res) => {
//     res.send('hello')
// })

const port = process.env.port || 3000

export const server = http.createServer(app)
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

let socketsConnected = new Set();
const io = socketIo(server, socketOptions);
// declare a global onlineuser variable
export const onlineUsers = new Map<string, any>();
let userId: string;
let adminId: string;

// global.onlineUsers = new Map();
// io.on('connection', onConnected);
io.on('connection', (socket:any) =>{
  console.log('Socket connected', socket.id);
  socketsConnected.add(socket.id);  
  onlineUsers.set('chatsocket', socket);

  //create a new chat instance

  //listen to a user joining
  socket.on('user', (sender: string) => {
    userId = sender;
    onlineUsers.set(userId, socket.id)
    console.log('userid', userId)
    io.emit('online-users', onlineUsers);
  })
  //listen to an admin joining
  socket.on('admin', (sender: string) => {
    adminId = sender;
    onlineUsers.set(adminId, socket.id)
    console.log('adminId', adminId)
    io.emit('online-users', onlineUsers);
  })
  io.emit('clients-total', socketsConnected.size);

  //emits online-user event when a client connects
  io.emit('online-users', onlineUsers)

  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id);
    socketsConnected.delete(socket.id);

    // delete the user or admin from the onlineUsers map
    onlineUsers.forEach((value: string, key: string) => {
      if (value === socket.id) {
        onlineUsers.delete(key);
      }

      io.emit('online-users', onlineUsers);
    });
    io.emit('clients-total', socketsConnected.size);
    io.emit('online-users', onlineUsers)
  });

  socket.on('message', (data:any) => {
    // console.log(JSON.stringify(data))
    // const {error} = newChatSchema.validate(data, options);
    // if(error){
    //   console.log(error.details[0].message)
    // }

    if(userId && adminId){
      const chat = new ChatInstance({
        message: data.message,
        userId: userId,
        adminId: adminId,
        sender: data.sender
      })
      console.log('object', chat)
      chat.save()
    }
    const sendUserSocket = onlineUsers.get(data.userId)
    if(sendUserSocket){
      try {
        const chats = async() => {
          return await getMessages({userId: data.userId,adminId: data.adminId});
        }
        io.to(sendUserSocket).emit('chat-message', chats);
      } catch (error) {
        console.log(error)
      }
    }

    const sendAdminSocket = onlineUsers.get(data.adminId)
    if(sendAdminSocket){
      try {
        const chats = async() => {
          return await getMessages({userId: data.userId,adminId: data.adminId});
        }
        io.to(sendAdminSocket).emit('chat-message', chats);
      } catch (error) {
        console.log(error)
      }
    }
    
  });

  //emit feedback to conversations between the logged in users
  if(userId && adminId){
    socket.on('feedback', (data:any) => {
      socket.broadcast.emit('feedback', data);
    });
  }
})

// function onConnected(socket:any) {
//   console.log('Socket connected', socket.id);
//   socketsConnected.add(socket.id);
//   io.emit('clients-total', socketsConnected.size);

//   socket.on('disconnect', () => {
//     console.log('Socket disconnected', socket.id);
//     socketsConnected.delete(socket.id);
//     io.emit('clients-total', socketsConnected.size);
//   });

//   socket.on('message', (data:any) => {
//     socket.broadcast.emit('chat-message', data);
//   });

//   socket.on('feedback', (data:any) => {
//     socket.broadcast.emit('feedback', data);
//   });
// }

export default app;