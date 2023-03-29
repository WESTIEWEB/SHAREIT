"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const user_1 = require("../model/user");
// ===== user registration services ===== //
const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = await user_1.userInstance.create({
            username,
            email,
            password
        });
        user.save();
    }
    catch (err) {
        next(err);
    }
};
exports.registerUser = registerUser;
//# sourceMappingURL=users.js.map