"use strict";
// function that checks if the email or phone number is already in use
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmailPhone = void 0;
const admin_1 = require("../model/admin");
const user_1 = require("../model/user");
const checkEmailPhone = async (email, phone) => {
    // check if email or phone number already exists for a user
    const isUserEmail = await user_1.UserInstance.findOne({ email }).lean();
    if (isUserEmail) {
        throw new Error('Email already exists');
    }
    const userPhone = await user_1.UserInstance.findOne({ phone }).lean();
    if (userPhone) {
        throw new Error('Phone number already exists');
    }
    // check if email or phone number already exists for an admin
    const adminEmail = await admin_1.AdminInstance.findOne({ email }).lean();
    if (adminEmail) {
        throw new Error('Email already exists');
    }
    const adminPhone = await admin_1.AdminInstance.findOne({ phone }).lean();
    if (adminPhone) {
        throw new Error('Phone number already exists');
    }
};
exports.checkEmailPhone = checkEmailPhone;
//# sourceMappingURL=check-email-phone.common.js.map