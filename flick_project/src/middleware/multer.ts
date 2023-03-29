import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import { CLOUDINARY_API_SECRET, CLOUDINARY_NAME,CLOUDINARY_API_KEY } from '../config';

dotenv.config();

const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: CLOUDINARY_NAME , 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET,
  });

const storage = new CloudinaryStorage({
    cloudinary,
    params: async(req, file)=>{
        return {
            folder:"week9Abulms"
        }
    },

});

export const upload = multer({storage:storage})