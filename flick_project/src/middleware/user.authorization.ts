import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { UserInstance } from "../model/user";

export const authUser = async (req: JwtPayload, res: Response, next: NextFunction) => {
    try{
        const token = req.headers.authorization?.split(' ')[1];
        console.log('token...',token)
        if(!token){
            return res.status(400).json({
                message: 'user not signed in'
            })
        }
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;


        if(!decoded){
            return res.status(401).json({
                message: 'user not authorized, please sign in'
            })
        }
        const id  = decoded._id;
        console.log('id...',id)

        //verify if user with id exist
        const user = await UserInstance.findById(id);

        if(!user){
            return res.status(401).json({
                message: 'Kindly register or sign in'
            })
        }

        req.user = decoded;
        next();

    }catch(err:any){
        return res.status(500).json({
            Error: err.message,
            message: 'Internal server error'
        })
    }
}