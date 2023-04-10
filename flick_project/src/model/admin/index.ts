import { Schema, model } from "mongoose";

export interface IAdminInterface {
    toObject: any;
    dataValues: any;
    _id: string;
    username: string;
    email: string;
    phone: string;
    role: string;
    password: string;
    timestamp: Date;
    image: string;
    salt: string;
}

const adminSchema = new Schema<IAdminInterface>({
    username: {type:String, trim: true},
    email: {type:String, unique: true, trim: true, toLowerCase: true},
    phone: {type:String, unique: true, trim: true},
    salt: {type:String, trim: true},
    image: {
        type:String, 
        trim: true, 
        default: 'https://res.cloudinary.com/dxjyqzjxk/image/upload/v1622021008/Default%20Images/Default%20Profile%20Image.png',
        allowNull: false
    },
    password: {type:String, trim: true},
    role: {type:String, trim: true, default: 'user', enum: ['user', 'admin', 'superAdmin']},
    timestamp: {type: Date, default: Date.now},
    
},
{timestamps: true})

export const AdminInstance = model<IAdminInterface>('Admin', adminSchema)
