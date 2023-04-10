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