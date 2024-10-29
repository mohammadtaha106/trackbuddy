import mongoose from "mongoose";

export async function connectDB() {
    try {
        let connection = await mongoose.connect(process.env.MONGODB_URI)
        console.info('MONGODB CONNECTED');
        
    } catch (error) {
        console.log('err in connection',error);
        
    }
   
}