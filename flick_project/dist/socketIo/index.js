"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
const socketIO = require("socket.io");
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(__1.default);
const io = socketIO(server);
io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("disconnect", () => console.log("Client disconnected"));
});
server.listen(3000, () => console.log("Listening on port 3000"));
//# sourceMappingURL=index.js.map