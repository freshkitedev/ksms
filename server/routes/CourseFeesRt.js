import express from "express";
import {createCourseFees ,deleteCourseFees ,getCourseFees , getAllCourseFees ,updateCourseFees } from "../controller/courseFeesctr.js";

const Router = express.Router();

//Create fees for course
Router.post("/createcoursefees",createCourseFees);

//Get All Course Fees
Router.get("/getcoursefees", getAllCourseFees);

//Get Particular Course Fees
Router.get("/getcoursefees/:id", getCourseFees);

//Update Course Fees
Router.put("/updatefees/:id", updateCourseFees);

//Delete Course Fees defined
Router.delete("/deletefees/:id",deleteCourseFees);


export default Router;