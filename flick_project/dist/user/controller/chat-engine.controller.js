"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatUser = void 0;
const utils_1 = require("../../utils");
const services_1 = require("../services");
const chatUser = async (req, res) => {
    try {
        // const { username } = req.body;
        // console.log(username);
        const { error } = utils_1.chatUserSchema.validate(req.body, utils_1.options);
        if (error) {
            return res.status(400).json({
                message: error.message
            });
        }
        const data = await (0, services_1.createChatUser)(req.body);
        console.log(data);
        if (!data) {
            return res.status(400).json({
                message: 'user not created'
            });
        }
        return res.status(200).json({
            message: 'user created',
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
exports.chatUser = chatUser;
//# sourceMappingURL=chat-engine.controller.js.map