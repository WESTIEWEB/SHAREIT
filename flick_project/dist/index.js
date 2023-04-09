"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const database_1 = require("./database");
const users_route_1 = __importDefault(require("./routes/users-route"));
const chat_engine_route_1 = __importDefault(require("./routes/chat-engine.route"));
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
app.use('/users', users_route_1.default);
app.use('/chat-engine', chat_engine_route_1.default);
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
exports.io = socketIo(exports.server, socketOptions);
let socketsConnected = new Set();
// io.on('connection', onConnected);
exports.io.on('connection', (socket) => {
    console.log('Socket connected', socket.id);
    socketsConnected.add(socket.id);
    exports.io.emit('clients-total', socketsConnected.size);
    socket.on('disconnect', () => {
        console.log('Socket disconnected', socket.id);
        socketsConnected.delete(socket.id);
        exports.io.emit('clients-total', socketsConnected.size);
    });
    socket.on('message', (data) => {
        socket.broadcast.emit('chat-message', data);
    });
    socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data);
    });
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