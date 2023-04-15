"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, trim: true },
    email: { type: String, unique: true, trim: true, toLowerCase: true },
    phone: { type: String, unique: true, trim: true },
    salt: { type: String, trim: true },
    image: {
        type: String,
        trim: true,
        default: 'https://res.cloudinary.com/dhpstjgo4/image/upload/v1669583621/FoodAlbums/ojkchqru2rb2xetzgyjt.jpg',
        allowNull: false
    },
    password: { type: String, trim: true },
    role: { type: String, trim: true, default: 'user', enum: ['user', 'admin', 'superAdmin'] },
    timestamp: { type: Date, default: Date.now },
}, { timestamps: true });
exports.UserInstance = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=index.js.map