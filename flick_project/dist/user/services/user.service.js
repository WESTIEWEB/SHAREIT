"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.LoginUser = exports.registerUser = void 0;
const user_1 = require("../../model/user");
const utils_1 = require("../../utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const admin_1 = require("../../model/admin");
// ===== user registration services ===== //
const registerUser = async (input) => {
    const { username, email, phone, password } = input;
    //trim email
    const trimedEmail = email.trim().toLowerCase();
    //call the function that checks if the email or phone number is already in use
    await (0, utils_1.checkEmailPhone)(trimedEmail, phone);
    const salt = await (0, utils_1.generateSalt)();
    const newpassword = await (0, utils_1.generateHash)(password, salt);
    const user = await user_1.UserInstance.create({
        username,
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
        ...userObj,
    };
};
exports.registerUser = registerUser;
// ===== user login services ===== //
const LoginUser = async (input) => {
    const { email, password } = input;
    //trim email
    const trimedEmail = email.trim().toLowerCase();
    // login user
    const user = await user_1.UserInstance.findOne({ email: trimedEmail });
    const admin = await admin_1.AdminInstance.findOne({ email: trimedEmail });
    if (user) {
        const verify = await (0, utils_1.verifyPassword)(password, user.password, user.salt);
        if (!verify) {
            throw new Error('Invalid email or password');
        }
        // generate jwt token
        const token = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email }, config_1.JWT_SECRET, { expiresIn: '1d' });
        // remove password and salt from user object
        const userObj = user.toObject();
        delete userObj.password;
        delete userObj.salt;
        return {
            token,
            ...userObj,
        };
    }
    else if (admin) {
        const verify = await (0, utils_1.verifyPassword)(password, admin.password, admin.salt);
        if (!verify) {
            throw new Error('Invalid email or password');
        }
        // generate jwt token
        const token = jsonwebtoken_1.default.sign({ _id: admin._id, email: admin.email }, config_1.JWT_SECRET, { expiresIn: '1d' });
        // remove password and salt from user object
        const adminObj = admin.toObject();
        delete adminObj.password;
        delete adminObj.salt;
        return {
            token,
            ...adminObj,
        };
    }
};
exports.LoginUser = LoginUser;
// Get logged in userProfile
const getUserProfile = async (id) => {
    const isUser = await user_1.UserInstance.findById(id);
    if (!isUser) {
        throw new Error('User not found');
    }
    const userObj = isUser.toObject();
    delete userObj.password;
    delete userObj.salt;
    return {
        ...userObj
    };
};
exports.getUserProfile = getUserProfile;
//# sourceMappingURL=user.service.js.map