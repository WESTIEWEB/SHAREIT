import Joi from 'joi';
import bcrypt from 'bcrypt';

export const registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9-?!@#$%^&*,.\"\\s]{3,30}$')).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().label('Confirm password').messages({'any.only':'{{#label}} does not match'}),
    phone: Joi.string().max(10).required()
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6)
    .pattern(new RegExp('^[a-zA-Z0-9-?!@#$%^&*,.\"\\s]{3,30}$'))
    .required().messages({
        'any.required': 'Password is required',
        'string.min': 'Password should be at least {#limit} characters long',
        'string.pattern.base': 'Invalid email or password',
      }),
})

//chat-user schema
export const chatUserSchema = Joi.object({
    username: Joi.string().required(),
    first_name: Joi.string(),
    email: Joi.string().email(),
})
// New chat schema
export const newChatSchema = Joi.object({
    roomID: Joi.string(),
    message: Joi.string().required(),
    userId: Joi.string().required(),
    adminId: Joi.string().required(),
    sender: Joi.string().required(),
})
export const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
    errors: {
        wrap:{
            label: ''
        }
    }
}

export const generateSalt = async () => {
    const salt = await bcrypt.genSalt();
    return salt;
}

export const generateHash = async (password: string, salt: string) => {
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export const verifyPassword = async (password: string,hash: string, salt: string) => {
    const rehash = await bcrypt.hash(password, salt);
    if(rehash === hash){
        return true
    } else {
        return false
    }
}


// function that checks if the email or phone number is already in use

import { AdminInstance } from "../model/admin";
import { UserInstance } from "../model/user"

export const checkEmailPhone = async (email: string, phone: string) => {
    // check if email or phone number already exists for a user
    const isUserEmail = await UserInstance.findOne({email}).lean();
    if(isUserEmail){
        throw new Error('Email already exists')
    }
    const userPhone = await UserInstance.findOne({phone}).lean();
    if(userPhone){
        throw new Error('Phone number already exists')
    }

    // check if email or phone number already exists for an admin

    const adminEmail = await AdminInstance.findOne({email}).lean();
    if(adminEmail){
        throw new Error('Email already exists')
    }

    const adminPhone = await AdminInstance.findOne({phone}).lean();
    if(adminPhone){
        throw new Error('Phone number already exists')
    }

}