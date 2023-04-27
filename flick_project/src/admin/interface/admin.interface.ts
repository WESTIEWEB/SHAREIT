export interface IAdminInterface {
    toObject: any;
    dataValues: any;
    _id: string;
    username: string;
    email: string;
    phone: string;
    role: string;
    password?: string;
    timestamp: Date;
    image: string;
    salt?: string;
    socketId?: string;
}