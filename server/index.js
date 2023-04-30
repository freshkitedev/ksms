import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import studentroutes from "./routes/studentRt.js"
import teacherroutes from "./routes/TeacherRt.js"
dotenv.config();
const app = express();

//MIDDLE WARES
app.use(express.json());
app.use("/api/student",studentroutes)
app.use("/api/teacher",teacherroutes)

 
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