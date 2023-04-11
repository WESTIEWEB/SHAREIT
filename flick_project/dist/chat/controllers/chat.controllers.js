"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerGetChat = exports.chatControllers = void 0;
const utils_1 = require("../../utils");
const services_1 = require("../services");
const mongoose_1 = require("mongoose");
const chatControllers = async (req, res) => {
    try {
        console.log(req.body);
        const { error } = utils_1.newChatSchema.validate(req.body, utils_1.options);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                error: 'Bad request'
            });
        }
        const data = await (0, services_1.createChatRoom)(req.body);
        return res.status(200).json({
            message: 'chat created successfully',
            data
        });
    }
    catch (err) {
        return res.status(500).json({
            message: 'Internal server error',
            error: err.message
        });
    }
};
exports.chatControllers = chatControllers;
// get chat controller
const controllerGetChat = async (req, res) => {
    try {
        console.log(req.params, ".......");
        // const userId = new Types.ObjectId(req.params.userId)
        // const adminId = new Types.ObjectId(req.params.adminId)
        const { userId, adminId } = req.params;
        const chats = await (0, services_1.getMessages)({ userId: new mongoose_1.Types.ObjectId(userId), adminId: new mongoose_1.Types.ObjectId(adminId) });
        return res.status(200).json({
            status: 'success',
            data: chats
        });
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'internal server error',
            route: '/chat-messages'
        });
    }
};
exports.controllerGetChat = controllerGetChat;
//# sourceMappingURL=chat.controllers.js.map