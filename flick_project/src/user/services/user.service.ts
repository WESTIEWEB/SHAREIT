import express from 'express';
import { UserInstance } from '../../model/user';
import { generateHash, generateSalt, verifyPassword, checkEmailPhone } from '../../utils';
import jwt, {JwtPayload} from 'jsonwebtoken';
import { CHAT_ENGINE_URL, JWT_SECRET, PRIVATE_KEY, PROJECT_ID } from '../../config';
import { CreateUserDto, UserLoginDto,IuserDto } from '../dto';
import axios from 'axios';
import { AdminInstance } from '../../model/admin';
import { IUserInterface } from '../interface';

// ===== user registration services ===== //
export const registerUser = async (input: CreateUserDto) => {
   
    const { username, email, phone, password } = input;

    //trim email
    const trimedEmail = email.trim().toLowerCase();

    //call the function that checks if the email or phone number is already in use
    await checkEmailPhone(trimedEmail, phone);

    const salt = await generateSalt();
    const newpassword = await generateHash(password, salt);


    const user = await UserInstance.create({
        username,
        phone,
        email: trimedEmail,
        salt,
        password: newpassword,
    },
    // {new: true}
    ) as unknown as IUserInterface;


    // remove password and salt from user object
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.salt;

    // jwt token
    const token =jwt.sign({id: user._id, email: user.email}, JWT_SECRET, {expiresIn: '1d'}) as unknown as JwtPayload;

    return {
        token,
        ...userObj,
    }
    
}


// ===== user login services ===== //

export const LoginUser = async (input: UserLoginDto) => {

    const { email , password } = input;

    //trim email
    const trimedEmail = email.trim().toLowerCase();

    // login user
    const user = await UserInstance.findOne({email: trimedEmail});

    const admin = await AdminInstance.findOne({email: trimedEmail});
    
    if(user){
        const verify = await verifyPassword(password, user.password, user.salt);

        if(!verify){
            throw new Error('Invalid email or password')
        }

        // generate jwt token
        const token = jwt.sign({_id: user._id, email: user.email}, JWT_SECRET, {expiresIn: '1d'});

        // remove password and salt from user object
        const userObj = user.toObject();
        delete userObj.password;
        delete userObj.salt;

        return {
            token,
            ...userObj,
        }
    }

    else if(admin) {
        const verify = await verifyPassword(password, admin.password, admin.salt);

        if(!verify){
            throw new Error('Invalid email or password')
        }

        // generate jwt token
        const token = jwt.sign({_id: admin._id, email: admin.email}, JWT_SECRET, {expiresIn: '1d'});

        // remove password and salt from user object
        const adminObj = admin.toObject();
        delete adminObj.password;
        delete adminObj.salt;

        return {
            token,
            ...adminObj,
        }
    }

}

// Get logged in userProfile

export const getUserProfile = async (id: string) => {
    const isUser = await UserInstance.findById(id);
    if(!isUser){
        throw new Error('User not found')
    }
    const userObj = isUser.toObject();
    delete userObj.password;
    delete userObj.salt;
    return {
        ...userObj
    };
}