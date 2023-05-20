import student from "../models/Student.js";
import course from "../models/Course.js";
import coursefees from "../models/CourseFees.js"
import enrollment from "../models/Enrollment.js"
import { createError } from "../error.js";
// Create Student
export const createStudent = async (req, res, next) => {
  try {
    const coursecnt = await course.countDocuments({courseName: req.body.grade})
    if(coursecnt > 0)
    {
    const coursedata = await course.findOne({courseName: req.body.grade})
    const courseFee = await coursefees.findOne({courseName: req.body.grade},{year: req.body.academicYear});
    const Student = await student.countDocuments({admissionNo: req.body.admissionNo});
    if(Student < 1) {
    const newStudent = new student({
        Name:             req.body.Name,
        dateOfBirth:      req.body.dateOfBirth,
        fatherName:       req.body.fatherName,
        motherName:       req.body.motherName,
        homeAddress:      req.body.homeAddress,
        enrollmentDate:   req.body.enrollmentDate,
        emailID:          req.body.emailID,
        mobileNo:         req.body.mobileNo,
        lastDate:         req.body.lastDate,
        activeIndicator:  req.body.activeIndicator,
        userGroup:        req.body.userGroup,
        emisNumber:       req.body.emisNumber,
        admissionNo:      req.body.admissionNo,
        category:         req.body.category,
        group:            req.body.group,
        grade:            req.body.grade,
        section:            req.body.section,
        academicYear:     req.body.academicYear,
    });
    console.log(newStudent);
    await newStudent.save();
    const newenrollment = new enrollment({
      year:              req.body.academicYear,
      userId:            newStudent.rollNumber,
      totalCharges:      courseFee.totalCharges,
      courseName:        req.body.grade,
      courseId:          coursedata.courseId,
      

    })
    res.status(200).send("User Created SuccessFully");
  }
  else
  {
    return next(createError("500", "course not registered"))
  }
  }
  else 
  {
    return next(createError("500", "student already exists"))
  }
  } catch (err) {
    next(err)
  }
};

//All Student Details
export const getstudents = async (req, res, next) => {
  try {
    const allStudents = await student.find();
    res.status(201).send(allStudents);
  } catch (err) {
    next(err)
  }
};

//Particular Student Details
export const getstudent = async (req, res, next) => {
  try {
    const Student = await student.findById(req.params.id);
    res.status(201).send(Student);
  } catch (err) {
    next(err)
  }
};

//Update Student Details
export const updateStudent=async(req,res, next)=>{
  try {
      const updatestudent = await student.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: "true"}
        
      )
       return res.status(201).send(updatestudent);
    } catch (err) {
          next(err)
    }
  
  };

//Delete Student
export const deleteStudent = async(req,res, next)=>{
  
  try{
      await student.findByIdAndDelete(req.params.id);
      return res.status(204).send("Student has been deleted" );
  }catch(err){
     next(err)
  }
};