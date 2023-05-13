import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import studentroutes from "./routes/studentRt.js"
import teacherroutes from "./routes/TeacherRt.js"
import courseroutes from "./routes/CourseRt.js"
import coursefeesroutes from "./routes/CourseFeesRt.js"
import enrollmentroutes from "./routes/EnrollmentRt.js"
dotenv.config();
const app = express();

//MIDDLE WARES
app.use(express.json());
app.use("/api/student", studentroutes)
app.use("/api/teacher", teacherroutes)
app.use("/api/course", courseroutes)
app.use("/api/coursefees", coursefeesroutes)
app.use("/api/enrollment", enrollmentroutes)

 
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