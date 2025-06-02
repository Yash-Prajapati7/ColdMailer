import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {        
        await mongoose.connect(`${process.env.MONGODB_URI}/ColdMailer`);
        console.log("Database successfully connected!");
    }
    catch(error) {
        console.log("MongoDB Connection Failed :(\n" + error.message);
        process.exit(1);
    }
}
export default connectDB;