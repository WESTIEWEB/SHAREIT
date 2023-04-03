import axios from "axios";
import { IUserInterface } from "../interface";

export const apiPost = async (url:string, user: IUserInterface ) => {
    return await axios.post(url, user)
}

export const apiGet = async (url:string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }   
    }
    return await axios.get(url, config)
}