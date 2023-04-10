"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controller/admin.controller");
const router = (0, express_1.Router)();
router.post('/create-super-admin', admin_controller_1.controllerCreateSuperAdmin);
exports.default = router;
//# sourceMappingURL=admin-routes.js.map