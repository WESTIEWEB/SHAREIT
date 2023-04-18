"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlineUsers = exports.server = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const database_1 = require("./database");
const users_route_1 = __importDefault(require("./user/routes/users-route"));
const admin_routes_1 = __importDefault(require("./admin/routes/admin-routes"));
const chat_engine_route_1 = __importDefault(require("./chat/routes/chat-engine.route"));
const chat_1 = require("./model/chat");
const services_1 = require("./chat/services");
const socketIo = require('socket.io');
dotenv_1.default.config();
const app = (0, express_1.default)();
const DB_URL = process.env.DB_URI || 'mongodb://localhost:27017/ecommerce';
try {
    (0, database_1.dbConnection)(DB_URL);
}
catch (err) {
    console.log("database connection errot", err);
}
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../public')));
app.use('/api/v1/users', users_route_1.default);
app.use('/api/v1/chat-engine', chat_engine_route_1.default);
app.use('/api/v1/admin', admin_routes_1.default);
// app.use('/', (req, res) => {
//     res.send('hello')
// })
const port = process.env.port || 3000;
exports.server = http_1.default.createServer(app);
exports.server.listen(port, () => {
    console.log(`server is listening on: ${port}`);
});
const socketOptions = {
    path: '/socket.io',
    transports: ['websocket'],
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
};
let socketsConnected = new Set();
const io = socketIo(exports.server, socketOptions);
// declare a global onlineuser variable
exports.onlineUsers = new Map();
let userId;
let adminId;
// global.onlineUsers = new Map();
// io.on('connection', onConnected);
io.on('connection', (socket) => {
    console.log('Socket connected', socket.id);
    socketsConnected.add(socket.id);
    exports.onlineUsers.set('chatsocket', socket);
    //create a new chat instance
    //listen to a user joining
    socket.on('user', (sender) => {
        userId = sender;
        exports.onlineUsers.set(userId, socket.id);
        console.log('userid', userId);
        io.emit('online-users', exports.onlineUsers);
    });
    //listen to an admin joining
    socket.on('admin', (sender) => {
        adminId = sender;
        exports.onlineUsers.set(adminId, socket.id);
        console.log('adminId', adminId);
        io.emit('online-users', exports.onlineUsers);
    });
    io.emit('clients-total', socketsConnected.size);
    //emits online-user event when a client connects
    io.emit('online-users', exports.onlineUsers);
    socket.on('disconnect', () => {
        console.log('Socket disconnected', socket.id);
        socketsConnected.delete(socket.id);
        // delete the user or admin from the onlineUsers map
        exports.onlineUsers.forEach((value, key) => {
            if (value === socket.id) {
                exports.onlineUsers.delete(key);
            }
            io.emit('online-users', exports.onlineUsers);
        });
        io.emit('clients-total', socketsConnected.size);
        io.emit('online-users', exports.onlineUsers);
    });
    socket.on('message', (data) => {
        // console.log(JSON.stringify(data))
        // const {error} = newChatSchema.validate(data, options);
        // if(error){
        //   console.log(error.details[0].message)
        // }
        if (userId && adminId) {
            const chat = new chat_1.ChatInstance({
                message: data.message,
                userId: userId,
                adminId: adminId,
                sender: data.sender
            });
            console.log('object', chat);
            chat.save();
        }
        const sendUserSocket = exports.onlineUsers.get(data.userId);
        if (sendUserSocket) {
            try {
                const chats = async () => {
                    return await (0, services_1.getMessages)({ userId: data.userId, adminId: data.adminId });
                };
                io.to(sendUserSocket).emit('chat-message', chats);
            }
            catch (error) {
                console.log(error);
            }
        }
        const sendAdminSocket = exports.onlineUsers.get(data.adminId);
        if (sendAdminSocket) {
            try {
                const chats = async () => {
                    return await (0, services_1.getMessages)({ userId: data.userId, adminId: data.adminId });
                };
                io.to(sendAdminSocket).emit('chat-message', chats);
            }
            catch (error) {
                console.log(error);
            }
        }
    });
    //emit feedback to conversations between the logged in users
    if (userId && adminId) {
        socket.on('feedback', (data) => {
            socket.broadcast.emit('feedback', data);
        });
    }
});
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
exports.default = app;
//# sourceMappingURL=index.js.map