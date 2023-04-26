import express from "express";
import {createStudent,getstudent} from "../controller/studentcr.js";


const Router = express.Router();

//Create Student 

Router.post("/createstudent",createStudent);

//Get User

Router.get("/getusers/:id",getstudent);


export default Router;