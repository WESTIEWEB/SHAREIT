import { checkEmailPhone } from "../../common";
import { JWT_SECRET } from "../../config";
import {  AuthAminDto } from "../dto";
import { AdminInstance } from "../../model/admin";
import { generateHash, generateSalt } from "../../utils";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CreateAdminDto } from "../dto";

/**=================function that creates superAdmin =========================**/
export const creatSuperAdmin = async(data: CreateAdminDto) => {
  
    const {username, email, phone, password} = data;

    //trim email
    const trimedEmail = email.trim().toLowerCase();

    //call the function that checks if the email or phone number is already in use

    await checkEmailPhone(trimedEmail, phone);

    //generate salt and hash password
    const salt = await generateSalt();
    const newpassword = await generateHash(password, salt);

    const superAdmin = await AdminInstance.create({
        username,
        email: trimedEmail,
        phone,
        password: newpassword,
        salt,
        role: 'superAdmin'
    })
    
    // remove password and salt from user object
    const adminObj = superAdmin.toObject();
    delete adminObj.password;
    delete adminObj.salt;

    //generate jwt token
    const token = jwt.sign({id: superAdmin._id, email: superAdmin.email}, JWT_SECRET, {expiresIn: '1d'}) as unknown as JwtPayload;
    return {
        token,
        ...adminObj
    };
}

// a function that creates a new admin

export const createAdmin = async (payload: AuthAminDto, data: CreateAdminDto) => {
    console.log('hello', 'hello')
    console.log('object', payload)
    const id = payload._id;

    //check if the user is a superAdmin
    const isSuperAdmin = await AdminInstance.findOne({_id: id, role: 'superAdmin'}).lean();
    if(!isSuperAdmin){
        throw new Error('You are not authorized to perform this operation')
    }

    const {username, email, phone, password} = data;

    //trim email
    const trimedEmail = email.trim().toLowerCase();

    //call the function that checks if the email or phone number is already in use
    await checkEmailPhone(trimedEmail, phone);

    //generate salt and hash password
    const salt = await generateSalt();
    const newpassword = await generateHash(password, salt);

    const admin = await AdminInstance.create({
        username,
        email: trimedEmail,
        phone,
        password: newpassword,
        salt,
        role: 'admin'
    });

    // remove password and salt from user object
    const adminObj = admin.toObject();
    delete adminObj.password;
    delete adminObj.salt;

    //generate jwt token
    const token = jwt.sign({id: admin._id, email: admin.email}, JWT_SECRET, {expiresIn: '1d'}) as unknown as JwtPayload;

    return {
        token,
        ...adminObj
    };
}

