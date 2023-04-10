import mongoose, { Schema, Types, model } from "mongoose";
import { IUserInterface } from "../user";
import { IAdminInterface } from "../admin";

export interface IChat{
    _id: Types.ObjectId;
    roomID: string;
    message: string;
    user: Types.ObjectId | IUserInterface;
    admin: Types.ObjectId | IAdminInterface;
}

const chatSchema = new Schema<IChat>({
    roomID: {type: String, required: true},
    message: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    }

})

export const ChatInstance = model<IChat>('Chat', chatSchema)