"use strict";
// import { io } from '../index';
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
//# sourceMappingURL=index.js.map