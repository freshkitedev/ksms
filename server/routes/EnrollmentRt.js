import express from "express";
import {createEnrollment, deleteEnrollment,getEnrollment, getAllEnrollment,updateEnrollment} from "../controller/enrollmentctr.js";

const Router = express.Router();

//Create Enrollment
Router.post("/create",createEnrollment);

//Get All Enrollment
Router.get("/getenrollemnt", getAllEnrollment);

//Get Particular Enrollment 
Router.get("/getenrollemnt/:id", getEnrollment);

//Update Enrollment Detials
Router.put("/update/:id", updateEnrollment);

//Delete Enrollment
Router.delete("/delete/:id",deleteEnrollment);


export default Router;