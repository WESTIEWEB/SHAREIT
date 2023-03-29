"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, trim: true },
    email: { type: String, unique: true, trim: true, toLowerCase: true },
    phone: { type: String, unique: true, trim: true },
    salt: { type: String, trim: true },
    password: { type: String, trim: true },
}, { timestamps: true });
exports.UserInstance = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=index.js.map