import mongoose, { Types } from "mongoose";
import { IUserInterface } from "../user";
import { IAdminInterface } from "../admin";
export interface IChat {
    _id?: Types.ObjectId;
    message: string;
    userId: Types.ObjectId | IUserInterface;
    adminId: Types.ObjectId | IAdminInterface;
    sender: string;
    createdAt?: Date;
}
export declare const ChatInstance: mongoose.Model<IChat, {}, {}, {}, mongoose.Document<unknown, {}, IChat> & Omit<IChat & Required<{
    _id: Types.ObjectId;
}>, never>, any>;
//# sourceMappingURL=index.d.ts.map