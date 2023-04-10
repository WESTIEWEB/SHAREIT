"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middleware_1 = require("../../middleware");
const router = (0, express_1.Router)();
router.post('/create-super-admin', controllers_1.controllerCreateSuperAdmin);
router.post('/create-admin', middleware_1.authAdmin, controllers_1.controllerCreateAdmin);
exports.default = router;
//# sourceMappingURL=admin-routes.js.map