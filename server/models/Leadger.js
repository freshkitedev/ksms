import mongoose from "mongoose";
const ledgerSchema = new mongoose.Schema({
    date: {
        type: Date
    },
     
    openingBalance: {
        type: Number
    },
    txn: {
        type: Array
    },
    closingBalance: {
        type: Number
    }

});

export default mongoose.model("ledger",ledgerSchema)