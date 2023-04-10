"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../../user/controller");
const router = (0, express_1.Router)();
router.post("/authenticate-chat-user", controller_1.chatUser);
exports.default = router;
//# sourceMappingURL=chat-engine.route.js.map