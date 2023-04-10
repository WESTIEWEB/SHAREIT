"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.creatSuperAdmin = void 0;
const config_1 = require("../config");
const user_1 = require("../model/user");
const utils_1 = require("../utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**=================function that creates superAdmin =========================**/
const creatSuperAdmin = async (data) => {
    const { username, email, phone, password } = data;
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
    //generate salt and hash password
    const salt = await (0, utils_1.generateSalt)();
    const newpassword = await (0, utils_1.generateHash)(password, salt);
    const superAdmin = await user_1.UserInstance.create({
        username,
        email: trimedEmail,
        phone,
        password: newpassword,
        salt,
        role: 'superAdmin'
    });
    // remove password and salt from user object
    const userObj = superAdmin.toObject();
    //generate jwt token
    const token = jsonwebtoken_1.default.sign({ id: superAdmin._id, email: superAdmin.email }, config_1.JWT_SECRET, { expiresIn: '1d' });
    return {
        token,
        ...userObj
    };
};
exports.creatSuperAdmin = creatSuperAdmin;
//# sourceMappingURL=admin.services.js.map