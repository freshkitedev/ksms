import mongoose from "mongoose";
mongoose.set('useFindAndModify', false);
const transactionSchema = new mongoose.Schema({
    dateOfTxn: {
        type: Date
    },
    txnType: {
        type: String
    },
    paymentMode: {
        type: String
    },
    txnCategory: {
        type: String
    },
    txnAmount: {
        type: String
    },
    txnNotes: {
        type: String
    },
    rollNumber: {
        type: Number
    },
    StaffID: {
        type: Number
    },
    templateID: {
        type: Number
    },
    courseName: {
        type: String
    },
    year: {
        type: String
    }

});

export default mongoose.model("Transaction",transactionSchema)