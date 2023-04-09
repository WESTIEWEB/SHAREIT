import { JWT_SECRET } from "../config";
import { CreateUserDto } from "../dto";
import { UserInstance } from "../model/user";
import { generateHash, generateSalt } from "../utils";
import jwt, { JwtPayload } from 'jsonwebtoken';

/**=================function that creates superAdmin =========================**/
export const creatSuperAdmin = async(data: CreateUserDto) => {
  
    const {username, email, phone, password} = data;

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
    
    //generate salt and hash password
    const salt = await generateSalt();
    const newpassword = await generateHash(password, salt);

    const superAdmin = await UserInstance.create({
        username,
        email: trimedEmail,
        phone,
        password: newpassword,
        salt,
        role: 'superAdmin'
    })
    
    // remove password and salt from user object
    const userObj = superAdmin.toObject();

    //generate jwt token
    const token = jwt.sign({id: superAdmin._id, email: superAdmin.email}, JWT_SECRET, {expiresIn: '1d'}) as unknown as JwtPayload;
    return {
        token,
        ...userObj
    };
}