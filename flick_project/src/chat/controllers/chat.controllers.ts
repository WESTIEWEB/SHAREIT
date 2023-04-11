import { Request, Response } from "express";
import { newChatSchema, options } from "../../utils";
import { createChatRoom, getMessages } from "../services";
import { Types } from "mongoose";

export const chatControllers = async (req:Request, res: Response) => {
    try{
        console.log(req.body);
        const { error } = newChatSchema.validate(req.body, options);
        if(error){
            return res.status(400).json({
                status: 'error',
                message: error.message,
                error: 'Bad request'
            })
        }

        const data = await createChatRoom(req.body);

        return res.status(200).json({
            message: 'chat created successfully',
            data
        })
    }catch(err:any){
        return res.status(500).json({
            message: 'Internal server error',
            error: err.message
        })
    }
    
}

// get chat controller
export const controllerGetChat = async(req: Request, res: Response) => {
    try {
        console.log(req.params, ".......")
        // const userId = new Types.ObjectId(req.params.userId)
        // const adminId = new Types.ObjectId(req.params.adminId)
        const { userId, adminId } = req.params
        const chats = await getMessages({ userId: new Types.ObjectId(userId), adminId:new Types.ObjectId(adminId)})

        return res.status(200).json({
            status: 'success',
            data: chats
        })
    } catch (error:any) {
        res.status(500).json({
            error: error.message,
            message: 'internal server error',
            route: '/chat-messages'
        })
    }
}