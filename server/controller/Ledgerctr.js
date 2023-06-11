import ledgers from "../models/Ledger.js";

export const getLedgerByDate = async (req, res, next) => {
  try {
    const query = {date: req.body.date}
    const Ledger = await ledgers.findOne(query);
    res.status(201).send(Ledger);
  } catch (err) {
    next(err)
  }
};

export const getAllLedgers = async (req, res, next) => {
  try {
    const ledgerdata = await ledgers.findOne();
    res.status(201).send(ledgerdata);
  } catch (err) {
    next(err)
  }
};

export const commonsearch = async (req, res, next) => {
  try{
    const query = req.body.query;
  const results = await ledgers.find(query).toArray();
  // Return the search results
  return results;
  } catch(err) {
    nexr(err)
  }
};

