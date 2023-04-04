import express from 'express';
import { IUserInterface, UserInstance } from '../model/user';
import { generateHash, generateSalt, verifyPassword } from '../utils/validation';
import jwt, {JwtPayload} from 'jsonwebtoken';
import { IuserDto } from '../dto/user.dto';
import { CHAT_ENGINE_URL, JWT_SECRET, PRIVATE_KEY, PROJECT_ID } from '../config';
import { CreateUserDto, UserLoginDto } from '../dto';
import axios from 'axios';

// ===== user registration services ===== //
export const registerUser = async (input: CreateUserDto) => {
   
    const { username, email, phone, password } = input;

    //trim email
    const trimedEmail = email.trim().toLowerCase();

    const userEmail = await UserInstance.findOne({email:trimedEmail}).lean();
    if(userEmail){
        throw new Error('Email already exists')
    }
    const userPhone = await UserInstance.findOne({phone}).lean();
    if(userPhone){
        throw new Error('Phone number already exists')
    }
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

    // function to create a chat user
    // const chatResposne = await axios.put(`${CHAT_ENGINE_URL}/users/`, 
    //     {
    //         username: username,
    //         secret: password,
    //     },
    //     {
    //         headers: {
    //         "Private-Key": PRIVATE_KEY
    //         }
    //     });
    return {
        token,
        ...userObj,
        // chatAccount:{...chatResposne.data}
    }
    
}


// ===== user login services ===== //

export const LoginUser = async (input: UserLoginDto) => {

    const { email , password } = input;

    //trim email
    const trimedEmail = email.trim().toLowerCase();

    const user = await UserInstance.findOne({email: trimedEmail});
    if(!user){
        throw new Error('User not found')
    }

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

    // get chat user

    // const chatResposne = await axios.get(`${CHAT_ENGINE_URL}/users/me/`,
    //     {
    //         headers: {
    //         "Project-ID": PROJECT_ID,
    //         "User-Name": user.username,
    //         "User-Secret": password
    //         }
    //     });

    // return user object
    return {
        token,
        ...userObj,
        // chatAcct: chatResposne.data
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