"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminInstance = void 0;
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    username: { type: String, trim: true },
    email: { type: String, unique: true, trim: true, toLowerCase: true },
    phone: { type: String, unique: true, trim: true },
    salt: { type: String, trim: true },
    image: {
        type: String,
        trim: true,
        default: 'https://res.cloudinary.com/dxjyqzjxk/image/upload/v1622021008/Default%20Images/Default%20Profile%20Image.png',
        allowNull: false
    },
    password: { type: String, trim: true },
    role: { type: String, trim: true, default: 'user', enum: ['user', 'admin', 'superAdmin'] },
    timestamp: { type: Date, default: Date.now },
}, { timestamps: true });
exports.AdminInstance = (0, mongoose_1.model)('Admin', adminSchema);
//# sourceMappingURL=index.js.map