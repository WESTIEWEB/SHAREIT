import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

interface IAdminInterface {
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
    _id: {type: String, default: uuidv4()},
    username: {type:String, trim: true},
    email: {type:String, unique: true, trim: true, toLowerCase: true},
    phone: {type:String, unique: true, trim: true},
    salt: {type:String, trim: true},
    image: {
        type:String, 
        trim: true, 
        default: 'https://https://res.cloudinary.com/dhpstjgo4/image/upload/v1669583621/FoodAlbums/ojkchqru2rb2xetzgyjt.jpg',
        allowNull: false
    },
    password: {type:String, trim: true},
    role: {type:String, trim: true, default: 'admin', enum: ['admin', 'superAdmin', 'support']},
    timestamp: {type: Date, default: Date.now},
    
},
{timestamps: true})

export const AdminInstance = model<IAdminInterface>('Admin', adminSchema)
