import axios from 'axios';
import { Request, Response } from 'express';
import { UserInstance } from '../model/user';

export const createChatUser = async (req: Request, res: Response) => {
    const { username } = req.body;
    try {
        // const isUser = await UserInstance.findOne({email: email.trim().toLowerCase()})
        // if(!isUser) {
        //     return res.status(400).json({
        //         message: 'User not found, please register first'
        //     })
        // }
        const resp = await axios.post(`${process.env.CHAT_ENGINE_URL}/users/`, 
        {
            username: username,
            secret: username
        },
        {
            headers: {
            "PRIVATE-KEY": process.env.CHAT_ENGINE_KEY
            }
        });
        console.log(resp.data);
    } catch (error:any) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}
