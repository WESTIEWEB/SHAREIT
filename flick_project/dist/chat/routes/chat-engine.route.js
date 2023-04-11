"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../../user/controller");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post("/authenticate-chat-user", controller_1.chatUser);
router.post("/create-chat", controllers_1.chatControllers);
router.get("/chat-messages/:userId/:adminId", controllers_1.controllerGetChat);
exports.default = router;
//# sourceMappingURL=chat-engine.route.js.map