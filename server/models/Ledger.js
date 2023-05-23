import mongoose from "mongoose";
import Transaction from "./Transaction.js"
const Schema = mongoose.Schema;
const ledgerSchema = new mongoose.Schema({
    date: {
        type: Date
    },
     EODdeposit: {
        type:Number
     },
    openingBalance: {
        type: Number
    },
    txn: [
        {
          type: Schema.Types.ObjectId,
          ref: Transaction
        }
      ],
    closingBalance: {
        type: Number
    }

});

export default mongoose.model("ledger",ledgerSchema)