import express from "express";
import { createStudent, deleteStudent, getstudent, getstudents, updateStudent, commonsearch } from "../controller/studentcr.js";

const Router = express.Router();

//Create Student 
Router.post("/createstudent", createStudent);

//Get All Student Detials
Router.get("/getstudent", getstudents);

//Get Details For Particular Student
Router.get("/getusers/:id", getstudent);

//Update Student Detials
Router.put("/update/:id", updateStudent);

//Delete Student 
Router.delete("/delete/:id", deleteStudent);

//common query search
Router.get("/commonsearch", commonsearch);

export default Router;