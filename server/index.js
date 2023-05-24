import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import studentroutes from "./routes/studentRt.js"
import teacherroutes from "./routes/TeacherRt.js"
import courseroutes from "./routes/CourseRt.js"
import coursefeesroutes from "./routes/CourseFeesRt.js"
import enrollmentroutes from "./routes/EnrollmentRt.js"
import xlupload from "./routes/ExcelUploadRt.js"
import transactionrt from "./routes/TransactionRt.js"
import ledgerrt from "./routes/LedgerRoutes.js"
import cors from "cors"
dotenv.config();
const app = express();
export const errorHandler = (err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage, 
      stack: err.stack,
    });
  };

//MIDDLE WARES
app.use(cors());
app.use(errorHandler);
app.use(express.json());
app.use("/api/student", studentroutes)
app.use("/api/teacher", teacherroutes)
app.use("/api/course", courseroutes)
app.use("/api/coursefees", coursefeesroutes)
app.use("/api/enrollment", enrollmentroutes)
app.use("/api/upload", xlupload)
app.use("/api/transaction", transactionrt)
app.use("/api/ledger", ledgerrt)

 
const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO, { useNewUrlParser: true });
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