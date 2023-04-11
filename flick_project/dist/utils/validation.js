"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.generateHash = exports.generateSalt = exports.options = exports.newChatSchema = exports.chatUserSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.registerSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).pattern(new RegExp('^[a-zA-Z0-9-?!@#$%^&*,.\\s]{3,30}$')).required(),
    confirmPassword: joi_1.default.string().valid(joi_1.default.ref('password')).required().label('Confirm password').messages({ 'any.only': '{{#label}} does not match' }),
    phone: joi_1.default.string().max(10).required()
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).pattern(new RegExp('^[a-zA-Z0-9-?!@#$%^&*,.\\s]{3,30}$')).required(),
});
//chat-user schema
exports.chatUserSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    first_name: joi_1.default.string(),
    email: joi_1.default.string().email(),
});
// New chat schema
exports.newChatSchema = joi_1.default.object({
    roomID: joi_1.default.string(),
    message: joi_1.default.string().required(),
    userId: joi_1.default.string().required(),
    adminId: joi_1.default.string().required(),
    sender: joi_1.default.string().required(),
});
exports.options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
    errors: {
        wrap: {
            label: ''
        }
    }
};
const generateSalt = async () => {
    const salt = await bcrypt_1.default.genSalt();
    return salt;
};
exports.generateSalt = generateSalt;
const generateHash = async (password, salt) => {
    const hash = await bcrypt_1.default.hash(password, salt);
    return hash;
};
exports.generateHash = generateHash;
const verifyPassword = async (password, hash, salt) => {
    const rehash = await bcrypt_1.default.hash(password, salt);
    if (rehash === hash) {
        return true;
    }
    else {
        return false;
    }
};
exports.verifyPassword = verifyPassword;
//# sourceMappingURL=validation.js.map