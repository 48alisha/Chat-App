import mongoose from "mongoose";

const connectDb=async()=>{
    try{
      const conn= await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    }
    catch(err){
        console.error("MongoDB connection failed", err);
        process.exit(1);//means connection failed

    }
}
export default connectDb;
