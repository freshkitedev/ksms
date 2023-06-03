import express from "express";
import { createCourse, deleteCourse, getCourse, getAllCourse, updateCourse, commonsearch } from "../controller/coursectr.js";

const Router = express.Router();

//Create Course
Router.post("/createcourse", createCourse);

//Get All Courses
Router.get("/getcourse", getAllCourse);

//Get Particular Course 
Router.get("/getcourse/:id", getCourse);

//Update Course Detials
Router.put("/update/:id", updateCourse);

//Delete Course
Router.delete("/delete/:id", deleteCourse);

//common query search
Router.get("/commonsearch", commonsearch);

export default Router;