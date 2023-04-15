"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdmin = exports.creatSuperAdmin = void 0;
const config_1 = require("../../config");
const admin_1 = require("../../model/admin");
const utils_1 = require("../../utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**=================function that creates superAdmin =========================**/
const creatSuperAdmin = async (data) => {
    const { username, email, phone, password } = data;
    //trim email
    const trimedEmail = email.trim().toLowerCase();
    //call the function that checks if the email or phone number is already in use
    await (0, utils_1.checkEmailPhone)(trimedEmail, phone);
    //generate salt and hash password
    const salt = await (0, utils_1.generateSalt)();
    const newpassword = await (0, utils_1.generateHash)(password, salt);
    const superAdmin = await admin_1.AdminInstance.create({
        username,
        email: trimedEmail,
        phone,
        password: newpassword,
        salt,
        role: 'superAdmin'
    });
    // remove password and salt from user object
    const adminObj = superAdmin.toObject();
    delete adminObj.password;
    delete adminObj.salt;
    //generate jwt token
    const token = jsonwebtoken_1.default.sign({ id: superAdmin._id, email: superAdmin.email }, config_1.JWT_SECRET, { expiresIn: '1d' });
    return {
        token,
        ...adminObj
    };
};
exports.creatSuperAdmin = creatSuperAdmin;
// a function that creates a new admin
const createAdmin = async (payload, data) => {
    console.log('hello', 'hello');
    console.log('object', payload);
    const id = payload._id;
    //check if the user is a superAdmin
    const isSuperAdmin = await admin_1.AdminInstance.findOne({ _id: id, role: 'superAdmin' }).lean();
    if (!isSuperAdmin) {
        throw new Error('You are not authorized to perform this operation');
    }
    const { username, email, phone, password } = data;
    //trim email
    const trimedEmail = email.trim().toLowerCase();
    //call the function that checks if the email or phone number is already in use
    await (0, utils_1.checkEmailPhone)(trimedEmail, phone);
    //generate salt and hash password
    const salt = await (0, utils_1.generateSalt)();
    const newpassword = await (0, utils_1.generateHash)(password, salt);
    const admin = await admin_1.AdminInstance.create({
        username,
        email: trimedEmail,
        phone,
        password: newpassword,
        salt,
        role: 'admin'
    });
    // remove password and salt from user object
    const adminObj = admin.toObject();
    delete adminObj.password;
    delete adminObj.salt;
    //generate jwt token
    const token = jsonwebtoken_1.default.sign({ id: admin._id, email: admin.email }, config_1.JWT_SECRET, { expiresIn: '1d' });
    return {
        token,
        ...adminObj
    };
};
exports.createAdmin = createAdmin;
//# sourceMappingURL=admin.services.js.map