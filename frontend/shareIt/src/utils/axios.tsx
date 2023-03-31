import axios from "axios";
import { IUserInterface } from "../interface";

export const apiPost = async (url:string, user: IUserInterface ) => {
    return await axios.post(url, user)
}