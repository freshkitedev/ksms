import enrollment from "../models/Enrollment.js";

// Create Course
export const createEnrollment = async (req, res) => {
  try {
    const newEnrollment = new Enrollment({
        courseId:   req.body.courseId,
        year:         req.body.year,
        userId:       req.body.userId,
        enrollmentId:  req.body.enrollmentId,
        status:        req.body.status,
        dateEnrolled:  req.body.dateEnrolled,
        dateDeEnrolled: req.body.dateDeEnrolled,
        feesStatus:     req.body.feesStatus,
        totalCharges:   req.body.totalCharges,
        totalPaid:      req.body.totalPaid,
        totalDues:      req.body.totalDues,
    });
    console.log(newEnrollment);
    await newEnrollment.save();
    res.json({ success: "Enrollment of student/staff Created SuccessFully" });
  } catch (err) {
    return res.json({ Error: err });
  }
};

//All Enrollment Details
export const getAllEnrollment = async (req, res) => {
  try {
    const allEnrollment = await enrollment.find();
    res.json(allEnrollment);
  } catch (err) {
    return res.json({ Error: err });
  }
};

//Get Enrollment for particular staff/student
export const getEnrollment = async (req, res) => {
  try {
    const Enrollment = await enrollment.findById(req.params.id);
    res.json(Enrollment);
  } catch (err) {
    return res.json({ Error: err });
  }
};

//Update Enrollment Details
export const updateEnrollment =async(req,res)=>{
  try {
      const updateEnrollment = await enrollment.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: "true"}
        
      )
       return res.json(updateEnrollment);
    } catch (err) {
          return res.json({Error:err});
    }
  
  };

//Delete Enrollment
export const deleteEnrollment = async(req,res)=>{
  
  try{
      await enrollment.findByIdAndDelete(req.params.id);
      return res.json({success:"Enrollment has been deleted" });
  }catch(err){
      return res.json({Error:err});
  }
};