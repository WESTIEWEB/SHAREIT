"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const admin_1 = require("../model/admin");
const authAdmin = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        console.log(token);
        if (!token) {
            return res.status(400).json({
                message: 'user not signed in'
            });
        }
        console.log('token...', token);
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        console.log('decoded...', decoded);
        if (!decoded) {
            return res.status(401).json({
                message: 'user not authorized, please sign in'
            });
        }
        const id = decoded._id;
        console.log('id...', id);
        //verify if admin with id exist
        const admin = await admin_1.AdminInstance.findById(id);
        console.log('admin...', admin);
        if (!admin) {
            return res.status(401).json({
                message: 'Kindly register or sign in'
            });
        }
        req.admin = decoded;
        next();
    }
    catch (err) {
        return res.status(500).json({
            Error: err.message,
            message: 'Internal server error'
        });
    }
};
exports.authAdmin = authAdmin;
//# sourceMappingURL=admin.authorization.js.map