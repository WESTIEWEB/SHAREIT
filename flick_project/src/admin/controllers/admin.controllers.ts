import { Request, Response } from 'express';
import { options, registerSchema } from '../../utils';
import { creatSuperAdmin, createAdmin } from '../services';
import { JwtPayload } from 'jsonwebtoken';

export const controllerCreateSuperAdmin = async (req: Request, res: Response) => {
    try {
        const { error } = registerSchema.validate(req.body, options);
        if(error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message
            })
        }
        const admin = await creatSuperAdmin(req.body);
        return res.status(201).json({
            status: 'success',
            message: 'admin created successfully',
            data: admin
        })

    } catch (error: any) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            error: 'Internal server error',
            route: 'user/admin/create-super-admin'
        })
    }
}

// a function that creates an admin
export const controllerCreateAdmin = async (req: JwtPayload, res: Response) => {
    try {
        console.log("req.body", req.body)
        const { error } = registerSchema.validate(req.body, options);
        if(error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message
            })
        }
        console.log("admin>>>",req.admin);
        const admin = await createAdmin(req.admin, req.body);
        return res.status(201).json({
            status: 'success',
            message: 'admin created successfully',
            data: admin
        })

    } catch (error: any) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            error: 'Internal server error',
            route: 'user/admin/create-super-admin'
        })
    }
}