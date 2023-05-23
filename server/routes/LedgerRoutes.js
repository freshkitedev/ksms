import  express from "express";
import { getLedgerByDate, getAllLedgers } from "../controller/Ledgerctr.js";

const Router = express.Router();

//Get All Leadgers
Router.get("/getledger", getLedgerByDate);

//Get All ledger details by Date

Router.get("/getallledger", getAllLedgers);

export default Router;
