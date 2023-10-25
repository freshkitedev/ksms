import express from "express";
import { getLedgerByDate, getAllLedgers, commonsearch } from "../controller/Ledgerctr.js";

const Router = express.Router();

//Get All Leadgers
Router.get("/getledger", getLedgerByDate);

//Get All ledger details by Date

Router.get("/getallledger", getAllLedgers);

//common query search
Router.get("/commonsearch", commonsearch);

export default Router;
