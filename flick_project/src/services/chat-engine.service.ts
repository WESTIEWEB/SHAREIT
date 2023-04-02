import axios from 'axios';
import { Request, Response } from 'express';
import { CreateChatUserDto } from '../dto';
import { CHAT_ENGINE_SECRET, CHAT_ENGINE_URL, PRIVATE_KEY } from '../config';

export const createChatUser = async (data: CreateChatUserDto) => {
    const { username } = data;
    console.log(data)
    console.log(CHAT_ENGINE_URL, PRIVATE_KEY)
    const res = await axios.put(`${CHAT_ENGINE_URL}/users/`, 
        {
            username: username,
            secret: username,
            first_name: username,
        },
        {
            headers: {
            "private-key": PRIVATE_KEY
            }
        });
    
    return res.data;
    
}
