"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerCreateSuperAdmin = void 0;
const admin_services_1 = require("../services/admin.services");
const utils_1 = require("../utils");
const controllerCreateSuperAdmin = async (req, res) => {
    try {
        const { error } = utils_1.registerSchema.validate(req.body, utils_1.options);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message
            });
        }
        const admin = await (0, admin_services_1.creatSuperAdmin)(req.body);
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
//# sourceMappingURL=admin.controller.js.map