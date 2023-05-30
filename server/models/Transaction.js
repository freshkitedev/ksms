import mongoose from "mongoose";
mongoose.set('useFindAndModify', false);
const transactionSchema = new mongoose.Schema({
    dateOfTxn: {
        type: Date,
        default: Date.now
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
        type: Number
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
    },
    rteIndicator: {
        type: Boolean
    },
    rtePayer: {
        type: String
    }

});

export default mongoose.model("Transaction", transactionSchema)