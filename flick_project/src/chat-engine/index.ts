import axios from 'axios';
import { Request, Response } from 'express';

export const createChatUser = async (req: Request, res: Response) => {
    const { username } = req.body;
    try {
        const res = await axios.post(`${process.env.CHAT_ENGINE_URL}/users/`, 
        {
            username: username,
            secret: process.env.CHAT_ENGINE_SECRET
        },
        {
            headers: {
            "PRIVATE-KEY": process.env.CHAT_ENGINE_KEY
            }
        });
        console.log(res.data);
    } catch (error:any) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}
