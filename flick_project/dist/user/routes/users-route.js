"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const middleware_1 = require("../../middleware");
const router = express_1.default.Router();
router.post('/login', controller_1.login);
router.post('/register', controller_1.register);
router.get('/user/profile', middleware_1.authUser, controller_1.getUserProfileController);
exports.default = router;
//# sourceMappingURL=users-route.js.map