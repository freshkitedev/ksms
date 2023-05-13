import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment"

const teacherSchema = new mongoose.Schema({
    StaffID: {
        type: Number,
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
    },
    motherName:{
        type:String,
    },
    homeAddress:{
        type:String,
        required:true
    },
    enrollmentDate:{
        type:String
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
    },
    activeIndicator:{
        type:Boolean,
    },
    isAdim:{
        type:Boolean,
    },
    userGroup:{
        type:Array,
    },
    primarySubject:{
        type:String,
        required:true
    },
    secondarySubject:{
        type:Array,
    },
    deptID:{
        type:Number,
    }

});
autoIncrement.initialize(mongoose.connection);
teacherSchema.plugin(autoIncrement.plugin, {
    model: "teacher", 
    field: "StaffID", 
    startAt: 5001, 
    incrementBy: 1, 
  });

export default mongoose.model("teacher",teacherSchema)