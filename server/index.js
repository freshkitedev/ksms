import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/studentRt.js"
dotenv.config();
const app = express();

//MIDDLE WARES
app.use(express.json());
app.use("/api",routes)

 
const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");
    }
    catch(err){
        throw err;
    }
     
}

app.listen(5000,()=>{
    connect();
    console.log("Server is listening on 5000");
})