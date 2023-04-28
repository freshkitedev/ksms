import Teacher from "../models/Teacher.js";

//Create Teacher
export const createTeacher = async(req,res)=>{
try{
    const newTeacher = new Teacher ({
        Teacher_id:req.body.Teacher_id,
        Name:req.body.Name,
        dateOfBirth:req.body.dateOfBirth,
        fatherName:req.body.fatherName,
        motherName:req.body.motherName,
        homeAddress:req.body.homeAddress,
        enrollmentDate:req.body.enrollmentDate,
        emailID:req.body.emailID,
        mobileNo:req.body.mobileNo,
        lastDate:req.body.lastDate,
        activeIndicator:req.body.activeIndicator,
        isAdim:req.body.isAdim,
        userGroup:req.body.userGroup
    })
    console.log(newTeacher);
    await newTeacher.save();
    res.json({ success: "Teacher  Created SuccessFully" });
    }catch (err) {
        return res.json({ Error: err });
    }
};

//All Teachers Details
export const getTeachers = async(req,res)=>{
   try{
    const allTeacher = await Teacher.find();
     res.json(allTeacher);
    }catch (err) {
        return res.json({Error:err});
    }
};

//Particular Teacher Details 
export const getTeacher = async(req,res)=>{

    try{
        const Teacherdetails = await Teacher.findById(req.params.id);
        res.json(Teacherdetails);
    }catch (err) {
        return res.json({Error:err});
    }
};

//Update Teacher Details
export const updateTeacher=async(req,res)=>{
try {
    const updateteacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: "true"}
      
    )
     return res.json(updateteacher);
  } catch (err) {
        return res.json({Error:err});
  }

};

//Delete Teacher
export const deleteTeacher = async(req,res)=>{
   
    try{
        await Teacher.findByIdAndDelete(req.params.id);
        return res.json({success:"Teacher has been deleted" });
    }catch(err){
        return res.json({Error:err});
    }
};