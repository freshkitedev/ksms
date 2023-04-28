import student from "../models/Student.js";

// Create Student
export const createStudent = async (req, res) => {
  try {
    const newStudent = new student({
        rollNo: req.body.rollNo,
        Name: req.body.Name,
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
    });
    console.log(newStudent);
    await newStudent.save();
    res.json({ success: "User Created SuccessFully" });
  } catch (err) {
    return res.json({ Error: err });
  }
};

//All Student Details
export const getstudents = async (req, res) => {
  try {
    const allStudents = await student.find();
    res.json(allStudents);
  } catch (err) {
    return res.json({ Error: err });
  }
};

//Particular Student Details
export const getstudent = async (req, res) => {
  try {
    const Student = await student.findById(req.params.id);
    res.json(Student);
  } catch (err) {
    return res.json({ Error: err });
  }
};

//Update Student Details
export const updateStudent=async(req,res)=>{
  try {
      const updatestudent = await student.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: "true"}
        
      )
       return res.json(updatestudent);
    } catch (err) {
          return res.json({Error:err});
    }
  
  };

//Delete Student
export const deleteStudent = async(req,res)=>{
  
  try{
      await student.findByIdAndDelete(req.params.id);
      return res.json({success:"Student has been deleted" });
  }catch(err){
      return res.json({Error:err});
  }
};