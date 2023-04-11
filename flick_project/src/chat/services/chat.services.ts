import { ChatDto, ChatMessageDto, CreateChatDto } from "../dto";
import { ChatInstance } from '../../model/chat/index';
// a functoion that creates a new chat room
export const createChatRoom = async(data:CreateChatDto) => {
    const chat = await ChatInstance.create({
        userId: data.userId,
        adminId: data.adminId,
        message: data.message,
        sender: data.sender
    })

    return chat.save();
}


// get messages from chat entity 
export const getMessages = async(data: ChatMessageDto) => {
    const { userId, adminId } = data;
    console.log("userId: ", userId, "adminId: ", adminId)

    const messages = await ChatInstance.find()
    .populate('user')
    .populate('admin')

    console.log('messages', messages)

    const allMessages = messages.map((item) => ({
        owner: item.userId.toString() === item.sender,
        message: item.message,
        time : item.createdAt
    }))

    return allMessages
}
