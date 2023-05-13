import mongoose from "mongoose";

const student = new mongoose.Schema({
 
  rollNumber: {
    type: Number,
    required: true,
  },
  Name: {
    fName: {
      type: String,
      required: true,
    },
    mName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  fatherName: {
      type: String,
      required: true,
  },
  motherName: {
    type:String,
    required:true
  },
  homeAddress: {
    type:String,
    required:true
  },
  enrollmentDate: {
    type:String,
    required:true
  },
  emailID: {
    type:String,
    required:true
  },
  mobileNo: {
    type:Number,
    required:true
  },
  lastDate: {
    type:String,
  },
  activeIndicator: {
    type:Boolean,
  },
  userGroup:{
    type:Array,
  },
  class:{
    type:String,
    required:true
  },
  emisNumber:{
    type:Number,
  },
  admissionNo: {
    type:Number,
  }
});



export default mongoose.model("student",student)
