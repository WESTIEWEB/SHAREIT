"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnection = async (url) => {
    const connection = await mongoose_1.default.createConnection(url);
    if (connection) {
        return console.log('database connected successfully...');
    }
};
exports.dbConnection = dbConnection;
//# sourceMappingURL=index.js.map