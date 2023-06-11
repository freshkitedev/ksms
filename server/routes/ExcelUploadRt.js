import express from "express";
import { uploadStudents, xlupload } from "../controller/Upload.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const uploadstudents = multer({ dest: "uploadsstudents/" });
const Router = express.Router();

//Create xl upload
Router.post("/xl", upload.single('file'), xlupload);
Router.post("/studentupload", uploadstudents.single('file'), uploadStudents);



export default Router;