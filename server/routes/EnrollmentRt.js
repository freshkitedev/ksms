import express from "express";
import { createEnrollment, deleteEnrollment, getEnrollment, getAllEnrollment, updateEnrollment, commonsearch } from "../controller/enrollmentctr.js";

const Router = express.Router();

//Create Enrollment
Router.post("/create", createEnrollment);

//Get All Enrollment
Router.get("/getenrollemnt", getAllEnrollment);

//Get Particular Enrollment 
Router.get("/getenrollemnt/:id", getEnrollment);

//Update Enrollment Detials
Router.put("/update/:id", updateEnrollment);

//Delete Enrollment
Router.delete("/delete/:id", deleteEnrollment);

//common query search
Router.get("/commonsearch", commonsearch);

export default Router;