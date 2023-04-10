import { Types } from "mongoose";

export interface AuthAminDto {
    email: string;
    _id: Types.ObjectId;
}