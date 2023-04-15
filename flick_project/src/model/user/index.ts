import { Schema, model } from "mongoose";

export interface IUserInterface {
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

const userSchema = new Schema<IUserInterface>({
    username: {type:String, trim: true},
    email: {type:String, unique: true, trim: true, toLowerCase: true},
    phone: {type:String, unique: true, trim: true},
    salt: {type:String, trim: true},
    image: {
        type:String, 
        trim: true, 
        default: 'https://res.cloudinary.com/dhpstjgo4/image/upload/v1669583621/FoodAlbums/ojkchqru2rb2xetzgyjt.jpg',
        allowNull: false
    },
    password: {type:String, trim: true},
    role: {type:String, trim: true, default: 'user', enum: ['user', 'admin', 'superAdmin']},
    timestamp: {type: Date, default: Date.now},
    
},
{timestamps: true})

export const UserInstance = model<IUserInterface>('User', userSchema)
