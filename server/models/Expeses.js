import mongoose from "mongoose";

const expenseschema = new mongoose.Schema({
    Date:{
        type:String,
        required:true,
    },
    Reason:{
        type:String,
        required:true,
    },
    Amount:{
        type:Number,
        required:true,
    }
});
export default mongoose.model("expenses",expenseschema);