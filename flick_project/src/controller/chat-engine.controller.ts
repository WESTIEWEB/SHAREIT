import { Request, Response } from "express";
import { createChatUser } from "../services";
import { chatUserSchema, options } from "../utils";

export const chatUser = async (req: Request, res: Response) => {
    try{
        // const { username } = req.body;
        // console.log(username);
        const { error } = chatUserSchema.validate(req.body, options);
        if(error){
            return res.status(400).json({
                message: error.message
            })
        }
        const data = await createChatUser(req.body);
        console.log(data);
        if(!data){
            return res.status(400).json({
                message: 'user not created'
            })
        }
        return res.status(200).json({
            message: 'user created',
            data
        });

    }catch(err:any){
        return res.status(500).json({
            message: 'Internal server error',
            error: err.message
        })
    }
}