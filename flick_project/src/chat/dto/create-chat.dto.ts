import { Types } from "mongoose";

export interface CreateChatDto {
    userId: Types.ObjectId;
    adminId: Types.ObjectId;
    message: string;
    sender: string;
    createdAt?: Date;
}