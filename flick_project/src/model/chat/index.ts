import mongoose, { Schema, Types, model, ObjectId } from "mongoose";
import { IUserInterface } from "../user";
import { IAdminInterface } from "../admin";
import { UserType } from '../../common/user-type.common';

export interface IChat{
    _id?: Types.ObjectId;
    message: string;
    userId: Types.ObjectId | IUserInterface;
    adminId: Types.ObjectId | IAdminInterface;
    sender: string;
    createdAt?: Date
}

const chatSchema = new Schema<IChat>({
    message: {type: String, required: true, trim: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    sender: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

},
{timestamps: true})

chatSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
});

chatSchema.virtual('admin', {
    ref: 'Admin',
    localField: 'adminId',
    foreignField: '_id',
    justOne: true,
});

export const ChatInstance = model<IChat>('Chat', chatSchema)