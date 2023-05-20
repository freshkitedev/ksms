import ledger from "../models/Ledger.js";

export const getLedgerByDate = async (req, res, next) => {
    try {
      const Ledger = await ledger.findOne(req.body.date);
      res.status(201).send(Ledger);
    } catch (err) {
      next(err)
    }
  };

  export const getAllLedgers = async (req, res, next) => {
    try {
      const ledgerdata = await ledger.findOne();
      res.status(201).send(ledgerdata);
    } catch (err) {
      next(err)
    }
  };

