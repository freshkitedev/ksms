import express from "express";
import { uploadStudents, xlupload } from "../controller/Upload.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const uploadstudents = multer({ dest: "uploadsstudents/" });
const Router = express.Router();

//Create xl upload
Router.post("/xl", xlupload);
Router.post("/studentupload", uploadStudents);



export default Router;