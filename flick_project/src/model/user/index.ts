import { string } from "joi";
import mongoose, { Schema, model } from "mongoose";
import { v4 as uuidv4} from 'uuid';

export interface IUserInterface {
    toObject: any;
    dataValues: any;
    _id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    salt: string;
}

const userSchema = new Schema<IUserInterface>({
    name: {type:String, trim: true},
    email: {type:String, unique: true, trim: true, toLowerCase: true},
    phone: {type:String, unique: true, trim: true},
    salt: {type:String, trim: true},
    password: {type:String, trim: true},
    
}, {timestamps: true})

export const UserInstance = model<IUserInterface>('User', userSchema)
