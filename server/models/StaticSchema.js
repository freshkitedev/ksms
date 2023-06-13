import mongoose from "mongoose";
const Schema = mongoose.Schema;
const staticSchema = new mongoose.Schema({
    transactionType: {
        type: String
    },
    paymentMode: {
        type: String
    }

});

export default mongoose.model("staticschema", staticSchema)