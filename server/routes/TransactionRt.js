import express from "express";
import { createTransaction, getTransaction, getAllTransaction, getTransactionByDate, updateTransaction, revertTransaction, commonsearch } from "../controller/transactionctr.js";

const Router = express.Router();

//Create Transaction
Router.post("/create", createTransaction);

//Get All Transaction
Router.get("/gettransaction", getAllTransaction);

//Get Particular Transaction 
Router.get("/gettransaction/:id", getTransaction);

//Get All Transaction by Date

Router.get("/getalltransaction", getTransactionByDate);

//Update Transaction Detials
Router.put("/update/:id", updateTransaction);

//Delete Transaction
//Router.delete("/delete/:id",deleteTransaction);
//Revert Transaction
Router.post("/revert/:id", revertTransaction);

//common query search
Router.get("/commonsearch", commonsearch);
export default Router;