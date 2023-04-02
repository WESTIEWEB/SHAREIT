"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChatUser = void 0;
const axios_1 = __importDefault(require("axios"));
const createChatUser = async (req, res) => {
    const { username } = req.body;
    try {
        // const isUser = await UserInstance.findOne({email: email.trim().toLowerCase()})
        // if(!isUser) {
        //     return res.status(400).json({
        //         message: 'User not found, please register first'
        //     })
        // }
        const resp = await axios_1.default.post(`${process.env.CHAT_ENGINE_URL}/users/`, {
            username: username,
            secret: username
        }, {
            headers: {
                "PRIVATE-KEY": process.env.CHAT_ENGINE_KEY
            }
        });
        console.log(resp.data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};
exports.createChatUser = createChatUser;
//# sourceMappingURL=index.js.map