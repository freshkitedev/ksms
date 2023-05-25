import express from "express";
import {xlupload} from "../controller/Upload.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const Router = express.Router();

//Create xl upload
Router.post("/xl", upload.single('file'), xlupload);



export default Router;