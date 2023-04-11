import { Types } from "mongoose";

export interface ChatMessageDto{
    userId: Types.ObjectId;
    adminId: Types.ObjectId;
}