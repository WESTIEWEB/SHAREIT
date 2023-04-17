// import { io } from '../index';

import app from "..";
import http from 'http';
import { ChatInstance } from "../model/chat";
import { getMessages } from "../chat/services";
import { Server } from 'socket.io';

const socketOptions = {
  path: '/socket.io',
  transports: ['websocket'],
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
};

// const socketConnected = new Set();

// const onConnected = (socket: any) => {
//     console.log('socket connected', socket.id);
//     socketConnected.add(socket.id);
//     console.log('socketConnected', socketConnected);
//     io.emit('connected clients', socketConnected.size);

//     socket.on('disconnect', () => {
//         console.log('socket disconnected', socket.id);
//         socketConnected.delete(socket.id);
//         console.log('socketConnected', socketConnected);
//         io.emit('connected clients', socketConnected.size);
//     });

//     socket.on('chat message', (msg: any) => {
//         console.log('message: ' + msg);
//         socket.broadcast.emit('chat message', msg);
//     });

//     socket.on('typing', (data: any) => {
//         socket.broadcast.emit('typing', data);
//     });
// }
// io.on('connection', onConnected);

// export default io;


