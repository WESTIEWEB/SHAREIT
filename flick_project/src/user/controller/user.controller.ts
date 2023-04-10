import express, { Request, Response, NextFunction } from 'express';
import { LoginUser, registerUser, getUserProfile } from '../services/user.service';
import { registerSchema, options, loginSchema } from '../../utils/validation';
import { JwtPayload } from 'jsonwebtoken';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { error } = registerSchema.validate(req.body, options);
        if(error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message
            })
        }
        console.log("req.body", req.body);
        const user = await registerUser(req.body);

        console.log("user", user);
        return res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: user
        })
    } catch(err: any) {
        return res.status(err.statusCode || 500).json({
            message: err.message,
            error: "Internal server error",
            route: 'users/register'
        })
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { error } = loginSchema.validate(req.body, options);
        if(error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message
            })
        }
        const user = await LoginUser(req.body);
        console.log("user", user)
        return res.status(201).json({
            status: 'success',
            message: 'Login successfully',
            data: user
        })
    } catch(err: any) {
        console.log(err)
        res.status(err.statusCode || 500).json({
            message: err.message,
            error: 'Internal server error',
            route: 'users/login'
        })
    }
}

export const getUserProfileController = async (req: JwtPayload, res: Response, next: NextFunction) => {
    try {
        const userId = req.user._id;
        const user = await getUserProfile(userId);
        return res.status(200).json({
            status: 'success',
            message: 'User profile',
            data: user
        });
        
    } catch (error: any) {
        res.status(error.statusCode || 500).json({
            error: 'Internal server error',
            message: error.message,
            route: 'user/profile'
        })
    }
}