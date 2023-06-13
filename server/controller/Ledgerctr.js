import { createError } from "../error.js";
import ledgers from "../models/Ledger.js";

export const getLedgerByDate = async (req, res, next) => {
  try {
    const query = {date: req.body.date}
    const Ledger = await ledgers.findOne(query);
    if(Ledger != "") {
    res.status(201).send(Ledger);
    } else {
      return next(createError(500, "empty data received"))
    }
  } catch (err) {
    next(err)
  }
};

export const getAllLedgers = async (req, res, next) => {
  try {
    const ledgerdata = await ledgers.find();
    if(ledgerdata != "") {
    res.status(201).send(ledgerdata);
    } else {
      return next(createError(500, "empty data received"))
    }
  } catch (err) {
    next(err)
  }
};

export const commonsearch = async (req, res, next) => {
  try{
    const query = req.body.query;
  const results = await ledgers.find(query);
  // Return the search results
  if(results != "") {
    console.log("check");
   // const results = await cursor.toArray();
    // Return the search results
    return res.status(201).send(results);
    }else {
      console.log("error")
      return next(createError(500, "cannot retrieve data"))
    }
  } catch(err) {
    nexr(err)
  }
};

