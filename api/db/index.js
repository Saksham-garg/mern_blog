import mongoose from "mongoose";
import { DATABASE_NAME,APP_NAME } from "../utils/constants.js";


const connectDB = async() => {
    try {
        const dbInstance = await mongoose.connect(`${process.env.DATABASE_URL}${DATABASE_NAME}?retryWrites=true&w=majority&appName=${APP_NAME}`)
        console.log("Connection to DB HOST ",dbInstance.connection.host)
    } catch (error) {
        console.log("Connection FAILED to HOST",error)
        process.exit(1)        
    }
}

export { 
    connectDB
}