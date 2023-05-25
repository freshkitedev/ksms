import express from "express";
import {xlupload} from "../controller/Upload.js";

const Router = express.Router();

//Create xl upload
Router.post("/xl",xlupload);



export default Router;