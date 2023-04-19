import mongoose from "mongoose";

export const dbConnection = async(url: string) => {
   const connection = await mongoose.createConnection(url);
   if(connection) {
    return console.log('database connected successfully...')
   }
}
