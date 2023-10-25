import express from "express";
import { createTransactionType, getAllTransactionType, createPaymentMode, getAllPaymentMode } from "../controller/staticSchemactr.js";

const Router = express.Router();

//Create transactionType
Router.post("/transactiontype", createTransactionType);

//Get All Course Fees
Router.get("/getalltransactiontype", getAllTransactionType);

//create PaymentMode
Router.post("/paymentmode", createPaymentMode);

//getallPayment Mode
Router.get("/getallpaymentmode", getAllPaymentMode);


export default Router;