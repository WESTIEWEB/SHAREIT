import mongoose from "mongoose";
export const dbConnection = async(url: string) => {
   const connection = await mongoose.connect(url);
   if(connection) {
    return console.log('database connected successfully...')
   }
}
