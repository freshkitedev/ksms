import  express from "express";
import { createTeacher,getTeachers, getTeacher, updateTeacher, deleteTeacher } from "../controller/Teachercr.js";

const Router = express.Router();

//Create Teacher  
Router.post("/createteacher",createTeacher);

//Get Teacher  Detials
Router.get("/getteacher", getTeachers);

//Get Details For Particular Teacher 
Router.get("/getuser/:id",getTeacher);

//Update Teacher  Detials
Router.put("/updateteacher/:id",updateTeacher);

//Delete Teacher 
Router.delete("/delete/:id",deleteTeacher);

export default Router;