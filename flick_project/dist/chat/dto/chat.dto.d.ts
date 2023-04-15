import { Types } from 'mongoose';
export interface ChatDto {
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
    adminId: Types.ObjectId;
    message: string;
    sender: string;
}
//# sourceMappingURL=chat.dto.d.ts.map