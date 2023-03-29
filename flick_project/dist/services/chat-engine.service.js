"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChatUser = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const createChatUser = async (data) => {
    const { username, email } = data;
    console.log(data);
    const res = await axios_1.default.put(config_1.CHAT_ENGINE_URL, {
        username: username,
        secret: config_1.CHAT_ENGINE_SECRET,
        first_name: username,
        email: email
    }, {
        headers: {
            "private-key": config_1.PRIVATE_KEY
        }
    });
    return res.data;
};
exports.createChatUser = createChatUser;
//# sourceMappingURL=chat-engine.service.js.map