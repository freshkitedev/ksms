import enrollment from "../models/Enrollment.js";
import { createError } from "../error.js";
// Create Course
export const createEnrollment = async (req, res, next) => {
  try {
    const concessionFee = req.body.concession
    if(concessionFee)
    {
      var totalFee = req.body.totalCharges - concessionFee
    }
    else{
       var totalFee = req.body.totalCharges
    }
    const newEnrollment = new enrollment({
        courseId:   req.body.courseId,
        year:         req.body.year,
        userId:       req.body.userId,
        enrollmentId:  req.body.enrollmentId,
        status:        req.body.status,
        dateEnrolled:  req.body.dateEnrolled,
        dateDeEnrolled: req.body.dateDeEnrolled,
        feesStatus:     req.body.feesStatus,
        totalCharges:   totalFee,
        totalPaid:      req.body.totalPaid,
        totalDues:      req.body.totalDues,
        balance:        req.body.balance,
        concession:     req.body.concession,
    });
    console.log(newEnrollment);
    await newEnrollment.save();
    res.status(200).send("Enrollment of student/staff Created SuccessFully");
  } catch (err) {
    next(err)
  }
};

//All Enrollment Details
export const getAllEnrollment = async (req, res, next) => {
  try {
    const allEnrollment = await enrollment.find();
    res.status(201).send(allEnrollment);
  } catch (err) {
    next(err)
  }
};

//Get Enrollment for particular staff/student
export const getEnrollment = async (req, res, next) => {
  try {
    const Enrollment = await enrollment.findById(req.params.id);
    res.status(201).send(Enrollment);
  } catch (err) {
    next(err)
  }
};

//Update Enrollment Details
export const updateEnrollment =async(req,res, next)=>{
  try {
      const updateEnrollment = await enrollment.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: "true"}
        
      )
       return res.status(201).send(updateEnrollment);
    } catch (err) {
         next(err)
    }
  
  };

//Delete Enrollment
export const deleteEnrollment = async(req,res, next)=>{
  
  try{
      await enrollment.findByIdAndDelete(req.params.id);
      return res.status(204).send("Enrollment has been deleted" );
  }catch(err){
      next(err)
  }
};