"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const user_1 = require("../model/user");
const authUser = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        console.log(token);
        if (!token) {
            return res.status(400).json({
                message: 'user not signed in'
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                message: 'user not authorized, please sign in'
            });
        }
        const id = decoded._id;
        console.log('id...', id);
        //verify if user with id exist
        const isUser = await user_1.UserInstance.findById(id);
        if (!isUser) {
            return res.status(401).json({
                message: 'Kindly register or sign in'
            });
        }
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(500).json({
            Error: err.message,
            message: 'Internal server error'
        });
    }
};
exports.authUser = authUser;
//# sourceMappingURL=user.authorization.js.map