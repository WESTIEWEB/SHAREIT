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
const services_2 = require("./user/services");
const services_3 = require("./admin/services");
const socketIo = require('socket.io');
dotenv_1.default.config();
const app = (0, express_1.default)();
const DB_URL = process.env.DB_URI || 'mongodb://localhost:27017/ecommerce';
try {
    (0, database_1.dbConnection)(DB_URL);
}
catch (err) {
    console.log(err);
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
let users = [];
let admins = [];
// global.onlineUsers = new Map();
// io.on('connection', onConnected1);
io.on('connection', (socket) => {
    console.log('Socket connected', socket.id);
    socketsConnected.add(socket.id);
    exports.onlineUsers.set('chatsocket', socket);
    //create a new chat instance
    //listen to a user joining
    socket.on('user', async (sender) => {
        userId = sender;
        // onlineUsers.set(userId, socket.id)
        console.log('userid', userId);
        try {
            const aUser = await (0, services_2.getUserProfile)(sender);
            users.push({
                ...aUser,
                socketId: socket.id
            });
            io.emit('online-users', users);
            console.log('users>>>>>', users);
        }
        catch (error) {
            console.log(error);
        }
        // console.log(onlineUsers)
    });
    //listen to an admin joining
    socket.on('admin', async (sender) => {
        adminId = sender;
        // onlineUsers.set(adminId, socket.id)
        console.log('adminId', adminId);
        // io.emit('online-users', users);
        try {
            // get admin user to save in the global admins array
            const anAdmin = await (0, services_3.getAdminById)(adminId);
            admins.push({
                ...anAdmin,
                socketId: socket.id
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    io.emit('clients-total', socketsConnected.size);
    //emits online-user event when a client connects
    io.emit('online-users', users);
    console.log('users>>>>>', users);
    socket.on('disconnect', () => {
        console.log('Socket disconnected', socket.id);
        socketsConnected.delete(socket.id);
        // delete the user from the onlineUsers map
        users = users.filter((user) => user.socketId !== socket.id);
        console.log(`user ${userId} disconnected`);
        //delete the disonnected admins
        admins = admins.filter((admin) => admin._id !== adminId);
        // onlineUsers.forEach((value: string, key: string) => {
        //   if (value === socket.id) {
        //     onlineUsers.delete(key);
        //   }
        //   io.emit('online-users', onlineUsers);
        // });
        io.emit('clients-total', socketsConnected.size);
        io.emit('online-users', users);
        console.log('connected users>>>>>', users);
        // io.emit('online-users', onlineUsers)
    });
    socket.on('message', async (data) => {
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
        // const sendUserSocket = onlineUsers.get(data.userId)
        // if(sendUserSocket){
        //   try {
        //     const chats = await getMessages({userId: data.userId,adminId: data.adminId});
        //     io.to(sendUserSocket).emit('chat-message', chats);
        //   } catch (error) {
        //     console.log(error)
        //   }
        // }
        if (data.sender === userId) {
            const adminSocket = admins.find((admin) => admin._id === data.adminId);
            if (adminSocket) {
                try {
                    const chats = await (0, services_1.getMessages)({ userId: data.userId, adminId: data.adminId });
                    io.to(adminSocket.socketId).emit('chat-message', chats);
                }
                catch (error) {
                    console.log(error);
                }
            }
            return;
        }
        else {
            // send chat to a particular user's cocket
            const userSocket = users.find((user) => user._id === data.userId);
            if (userSocket) {
                try {
                    const chats = await (0, services_1.getMessages)({ userId: data.userId, adminId: data.adminId });
                    io.to(userSocket.socketId).emit('chat-message', chats);
                }
                catch (error) {
                    console.log(error);
                }
            }
            return;
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