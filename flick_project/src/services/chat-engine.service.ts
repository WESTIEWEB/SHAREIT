import axios from 'axios';
import { Request, Response } from 'express';
import { CreateChatUserDto } from '../dto';
import { CHAT_ENGINE_SECRET, CHAT_ENGINE_URL, PRIVATE_KEY } from '../config';

export const createChatUser = async (data: CreateChatUserDto) => {
    const { username, email } = data;
    console.log(data)
    const res = await axios.put(CHAT_ENGINE_URL, 
        {
            username: username,
            secret: CHAT_ENGINE_SECRET,
            first_name: username,
            email: email
        },
        {
            headers: {
            "private-key": PRIVATE_KEY
            }
        });
    
    return res.data;
    
}
