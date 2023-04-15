"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.createChatRoom = void 0;
const index_1 = require("../../model/chat/index");
// a functoion that creates a new chat room
const createChatRoom = async (data) => {
    const chat = await index_1.ChatInstance.create({
        userId: data.userId,
        adminId: data.adminId,
        message: data.message,
        sender: data.sender
    });
    return chat.save();
};
exports.createChatRoom = createChatRoom;
// get messages from chat entity 
const getMessages = async (data) => {
    const { userId, adminId } = data;
    console.log("userId: ", userId, "adminId: ", adminId);
    const messages = await index_1.ChatInstance.find()
        .populate('user')
        .populate('admin');
    console.log('messages', messages);
    const allMessages = messages.map((item) => ({
        owner: item.userId.toString() === item.sender,
        message: item.message,
        dateTime: item.createdAt
    }));
    return allMessages;
};
exports.getMessages = getMessages;
//# sourceMappingURL=chat.services.js.map