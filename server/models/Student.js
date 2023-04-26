import mongoose from "mongoose";

const student = new mongoose.Schema({
  student_id: {
    type: String,
    required: true,
  },
  rollNo: {
    type: Number,
    required: true,
  },
  name: {
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
  },
  standard: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  fatherName: {
    
      type: String,
      required: true,
  },
  motherName:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  mobileNo:{
    type:Number,
    required:true
  }
});



export default mongoose.model("student",student)
