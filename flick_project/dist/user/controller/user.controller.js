"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfileController = exports.login = exports.register = void 0;
const user_service_1 = require("../services/user.service");
const validation_1 = require("../../utils/validation");
const register = async (req, res, next) => {
    try {
        const { error } = validation_1.registerSchema.validate(req.body, validation_1.options);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message
            });
        }
        console.log("req.body", req.body);
        const user = await (0, user_service_1.registerUser)(req.body);
        console.log("user", user);
        return res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: user
        });
    }
    catch (err) {
        return res.status(err.statusCode || 500).json({
            message: err.message,
            error: "Internal server error",
            route: 'users/register'
        });
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const { error } = validation_1.loginSchema.validate(req.body, validation_1.options);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message
            });
        }
        const user = await (0, user_service_1.LoginUser)(req.body);
        console.log("user", user);
        if (!user) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid email or password',
            });
        }
        return res.status(201).json({
            status: 'success',
            message: 'Login successfully',
            data: user
        });
    }
    catch (err) {
        console.log(err);
        res.status(err.statusCode || 500).json({
            message: err.message,
            error: 'Internal server error',
            route: 'users/login'
        });
    }
};
exports.login = login;
const getUserProfileController = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await (0, user_service_1.getUserProfile)(userId);
        return res.status(200).json({
            status: 'success',
            message: 'User profile',
            data: user
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            error: 'Internal server error',
            message: error.message,
            route: 'user/profile'
        });
    }
};
exports.getUserProfileController = getUserProfileController;
//# sourceMappingURL=user.controller.js.map