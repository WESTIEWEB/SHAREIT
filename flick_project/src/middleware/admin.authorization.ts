import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { AdminInstance } from "../model/admin";

export const authAdmin = async (req: JwtPayload, res: Response, next: NextFunction) => {
    try{
        const token = req.headers.authorization?.split(' ')[1];
        console.log(token)
        if(!token){
            return res.status(400).json({
                message: 'user not signed in'
            })
        }
        console.log('token...',token)
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

        console.log('decoded...',decoded)

        if(!decoded){
            return res.status(401).json({
                message: 'user not authorized, please sign in'
            })
        }
        const id  = decoded.id;
        console.log('id...',id)

        //verify if admin with id exist
        const admin = await AdminInstance.findById(id);
        console.log('admin...',admin)

        if(!admin){
            return res.status(401).json({
                message: 'Kindly register or sign in'
            })
        }

        req.admin = decoded;
        next();

    }catch(err:any){
        return res.status(500).json({
            Error: err.message,
            message: 'Internal server error'
        })
    }
}