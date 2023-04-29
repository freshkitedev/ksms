import mongoose from "mongoose";

const teacher = new mongoose.Schema({
    StaffID: {
        type: Number,
        required: true,
    },
     
    Name: {
        fName: {
          type: String,
          required: true,
        },
        mName:{
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
    motherName:{
        type:String,
        required:true
    },
    homeAddress:{
        type:String,
        required:true
    },
    enrollmentDate:{
        type:String,
        required:true
    },
    emailID:{
        type:String,
        required:true
    },
    mobileNo:{
        type:Number,
        required:true
    },
    lastDate:{
        type:String,
        required:true
    },
    activeIndicator:{
        type:Boolean,
        required:true
    },
    isAdim:{
        type:Boolean,
        required:true

    },
    userGroup:{
        type:Array,
        required:true
    },
    primarySubject:{
        type:String,
        required:true
    },
    secondarySubject:{
        type:Array,
        required:true
    },
    deptID:{
        type:Number,
        required:true
    }

});

export default mongoose.model("Teacher",teacher)