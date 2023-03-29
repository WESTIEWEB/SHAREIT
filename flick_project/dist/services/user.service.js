"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = exports.registerUser = void 0;
const user_1 = require("../model/user");
const validation_1 = require("../utils/validation");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
// ===== user registration services ===== //
const registerUser = async (input) => {
    const { name, email, phone, password } = input;
    //trim email
    const trimedEmail = email.trim().toLowerCase();
    const userEmail = await user_1.UserInstance.findOne({ email: trimedEmail }).lean();
    if (userEmail) {
        throw new Error('Email already exists');
    }
    const userPhone = await user_1.UserInstance.findOne({ phone }).lean();
    if (userPhone) {
        throw new Error('Phone number already exists');
    }
    const salt = await (0, validation_1.generateSalt)();
    const newpassword = await (0, validation_1.generateHash)(password, salt);
    const user = await user_1.UserInstance.create({
        name,
        phone,
        email: trimedEmail,
        salt,
        password: newpassword,
    });
    // remove password and salt from user object
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.salt;
    // jwt token
    const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, config_1.JWT_SECRET, { expiresIn: '1d' });
    return {
        token,
        ...userObj
    };
};
exports.registerUser = registerUser;
// ===== user login services ===== //
const LoginUser = async (input) => {
    const { email, password } = input;
    //trim email
    const trimedEmail = email.trim().toLowerCase();
    const user = await user_1.UserInstance.findOne({ email: trimedEmail });
    if (!user) {
        throw new Error('User not found');
    }
    const verify = await (0, validation_1.verifyPassword)(password, user.password, user.salt);
    if (!verify) {
        throw new Error('Invalid email or password');
    }
    // generate jwt token
    const token = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email }, config_1.JWT_SECRET, { expiresIn: '1d' });
    // remove password and salt from user object
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.salt;
    // return user object
    return {
        token,
        ...userObj
    };
};
exports.LoginUser = LoginUser;
//# sourceMappingURL=user.service.js.map