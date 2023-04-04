"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const io = require('socket.io')(index_1.server);
const socketConnected = new Set();
const onConnected = (socket) => {
    console.log('socket connected', socket.id);
    socketConnected.add(socket.id);
    console.log('socketConnected', socketConnected);
    io.emit('connected clients', socketConnected.size);
    socket.on('disconnect', () => {
        console.log('socket disconnected', socket.id);
        socketConnected.delete(socket.id);
        console.log('socketConnected', socketConnected);
        io.emit('connected clients', socketConnected.size);
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        socket.broadcast.emit('chat message', msg);
    });
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
};
io.on('connection', onConnected);
exports.default = io;
//# sourceMappingURL=index.js.map