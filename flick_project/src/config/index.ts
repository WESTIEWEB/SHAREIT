import dotenv from 'dotenv';
dotenv.config()

export const JWT_SECRET = process.env.JWT_SECRET!;
export const CLOUDINARY_NAME = process.env.CLOUD_NAME!;
export const CLOUDINARY_API_KEY = process.env.CLOUD_API_KEY!;
export const CLOUDINARY_API_SECRET = process.env.CLOUD_API_SECRET!;

// Chat Engine Config
export const CHAT_ENGINE_URL = process.env.CHAT_ENGINE_SERVER_URL!;
export const CHAT_ENGINE_SECRET = process.env.CHAT_ENGINE_SECRET!;
export const PRIVATE_KEY = process.env.PRIVATE_KEY!;
export const PROJECT_ID = process.env.CHAT_ENGINE_PROJECT_ID!;