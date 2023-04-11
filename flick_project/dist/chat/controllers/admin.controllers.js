"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerCreateAdmin = exports.controllerCreateSuperAdmin = void 0;
const utils_1 = require("../../utils");
const services_1 = require("../services");
const controllerCreateSuperAdmin = async (req, res) => {
    try {
        const { error } = utils_1.registerSchema.validate(req.body, utils_1.options);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message
            });
        }
        const admin = await (0, services_1.creatSuperAdmin)(req.body);
        return res.status(201).json({
            status: 'success',
            message: 'admin created successfully',
            data: admin
        });
    }
    catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            error: 'Internal server error',
            route: 'user/admin/create-super-admin'
        });
    }
};
exports.controllerCreateSuperAdmin = controllerCreateSuperAdmin;
// a function that creates an admin
const controllerCreateAdmin = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const { error } = utils_1.registerSchema.validate(req.body, utils_1.options);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message
            });
        }
        console.log("admin>>>", req.admin);
        const admin = await (0, services_1.createAdmin)(req.admin, req.body);
        return res.status(201).json({
            status: 'success',
            message: 'admin created successfully',
            data: admin
        });
    }
    catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            error: 'Internal server error',
            route: 'user/admin/create-super-admin'
        });
    }
};
exports.controllerCreateAdmin = controllerCreateAdmin;
//# sourceMappingURL=admin.controllers.js.map