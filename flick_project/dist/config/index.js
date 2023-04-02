"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROJECT_ID = exports.PRIVATE_KEY = exports.CHAT_ENGINE_SECRET = exports.CHAT_ENGINE_URL = exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.CLOUDINARY_NAME = exports.JWT_SECRET = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.CLOUDINARY_NAME = process.env.CLOUD_NAME;
exports.CLOUDINARY_API_KEY = process.env.CLOUD_API_KEY;
exports.CLOUDINARY_API_SECRET = process.env.CLOUD_API_SECRET;
// Chat Engine Config
exports.CHAT_ENGINE_URL = process.env.CHAT_ENGINE_SERVER_URL;
exports.CHAT_ENGINE_SECRET = process.env.CHAT_ENGINE_SECRET;
exports.PRIVATE_KEY = process.env.PRIVATE_KEY;
exports.PROJECT_ID = process.env.CHAT_ENGINE_PROJECT_ID;
//# sourceMappingURL=index.js.map