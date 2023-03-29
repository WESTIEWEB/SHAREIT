import express from 'express';
import { IUserInterface, UserInstance } from '../model/user';
import { generateHash, generateSalt, verifyPassword } from '../utils/validation';
import jwt, {JwtPayload} from 'jsonwebtoken';
import { IuserDto } from '../dto/user.dto';
import { JWT_SECRET } from '../config';
import { CreateUserDto, UserLoginDto } from '../dto';

// ===== user registration services ===== //
export const registerUser = async (input: CreateUserDto) => {
   
    const { name, email, phone, password } = input;

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
        name,
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
        ...userObj
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

    // return user object
    return {
        token,
        ...userObj
    }
}
