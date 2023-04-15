import axios from "axios";
import { IUserInterface } from "../interface";
import { IChat } from "@/interface/chatInterface";

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

export const apiPut = async (url:string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }   
    }
    return await axios.put(url, config)
}

export const apiDelete = async (url:string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }   
    }
    return await axios.delete(url, config)
}

export const apiPatch = async (url:string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }   
    }
    return await axios.patch(url, config)
}

export const apiPostChat = async (url:string, file: IChat) => {
    return await axios.post(url, file)
}