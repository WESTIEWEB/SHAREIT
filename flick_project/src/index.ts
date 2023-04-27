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
import { UserInstance } from './model/user';
import { getUserProfile } from './user/services';
import { IUserInterface } from './user/interface';
import { AdminInstance } from './model/admin';
import { IAdminInterface } from './admin/interface';
import { getAdminById } from './admin/services';

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

let users: IUserInterface [] = [];
let admins : IAdminInterface [] = [];
// global.onlineUsers = new Map();
// io.on('connection', onConnected1);
io.on('connection', (socket:any) =>{
  console.log('Socket connected', socket.id);
  socketsConnected.add(socket.id);
  onlineUsers.set('chatsocket', socket);

  //create a new chat instance

  //listen to a user joining
  socket.on('user', async(sender: string) => {
    userId = sender;
    // onlineUsers.set(userId, socket.id)
    console.log('userid', userId)

    try {
      if(users.some((user) => user._id === userId)) return;
      // get user to save in the global users array
      const aUser = await getUserProfile(sender)
      users.push({
        ...aUser,
        socketId: socket.id
      })
      io.emit('online-users', users);
      console.log('users>>>>>', users)

    } catch (error) {
      console.log(error)
    }
    
  // console.log(onlineUsers)
  })
  //listen to an admin joining
  socket.on('admin', async(sender: string) => {
    adminId = sender;
    // onlineUsers.set(adminId, socket.id)
    console.log('adminId', adminId)
    // io.emit('online-users', users);
    try {
      if(admins.some((admin) => admin._id === adminId)) return;
      // get user to save in the global users array
      // get admin user to save in the global admins array
      const anAdmin = await getAdminById(adminId)
      admins.push(
        {
          ...anAdmin,
          socketId: socket.id
        }
      )

    } catch (error) {
      console.log(error)
    }
  })
  io.emit('clients-total', socketsConnected.size);

  //emits online-user event when a client connects
  io.emit('online-users', users)

  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id);
    socketsConnected.delete(socket.id);

    // delete the user from the onlineUsers map
    users = users.filter((user) => user.socketId !== socket.id)

    console.log(`user ${socket.id} disconnected`)

    //delete the disonnected admins
    admins = admins.filter((admin) => admin._id !== adminId )

    // onlineUsers.forEach((value: string, key: string) => {
    //   if (value === socket.id) {
    //     onlineUsers.delete(key);
    //   }

    //   io.emit('online-users', onlineUsers);
    // });
    io.emit('clients-total', socketsConnected.size);
    io.emit('online-users', users)
    console.log('connected users>>>>>', users)
    // io.emit('online-users', onlineUsers)
  });

  socket.on('message', async(data:any) => {
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
      chat.save()
      
      if(data.sender === userId) {
      
        const adminSocket = admins.find((admin) => admin._id == chat.adminId.toString())
        console.log('adminSocket', adminSocket, admins)
        if(adminSocket){
          try {
            const chats = await getMessages({userId: data.userId,adminId: data.adminId});
            io.to(adminSocket.socketId).emit('chat-message', data);
            console.log('admin chat', data)
          } catch (error) {
            console.log(error)
          }
        }
  
      } else if(data.sender === adminId){
        // send chat to a particular user's cocket
        const userSocket = users.find((user) => user._id == chat.userId.toString())
        if(userSocket){
          try {
            const chats = await getMessages({userId: data.userId,adminId: data.adminId});
            io.to(userSocket.socketId).emit('chat-message', data);
            console.log('user chat', data)
          } catch (error) {
            console.log(error)
          }
        }
  
        // const sendAdminSocket = onlineUsers.get(data.adminId)
        // if(sendAdminSocket){
        //   try {
        //     const chats = await getMessages({userId: data.userId,adminId: data.adminId});
        
        //     io.to(sendAdminSocket).emit('chat-message', chats);
        //   } catch (error) {
        //     console.log(error)
        //   }
        // }else {
        //   return
        // }
  
      }
    }
    // const sendUserSocket = onlineUsers.get(data.userId)
    // if(sendUserSocket){
    //   try {
    //     const chats = await getMessages({userId: data.userId,adminId: data.adminId});
    //     io.to(sendUserSocket).emit('chat-message', chats);
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    
  });

  //emit feedback to conversations between the logged in users
  // if(userId && adminId){
  //   socket.on('feedback', (data:any) => {
  //     socket.broadcast.emit('feedback', data);
  //   });
  // }
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