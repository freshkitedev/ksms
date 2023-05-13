import courseFees from "../models/CourseFees.js";

// Create CourseFees
export const createCourseFees = async (req, res) => {
  try {
    Term = req.body.Term 
    frequency = req.body.frequency
    totalCharges = req.body.totalCharges
    if(length(Term) == frequency) 
    {
      sum = 0 
      Term.forEach(item => {
        sum += item;
      });
      console.log(sum);
      if(sum == totalCharges) 
      {
      const newCourseFees = new courseFees({
          courseName:   req.body.courseName,
          courseId:     req.body.courseId,
          year:         req.body.year,
          totalCharges: req.body.totalCharges,
          frequency:    req.body.frequency,
          startDate:     req.body.startDate,
          endDate:       req.body.endDate,
          status:        req.body.status,
          Term:          req.body.Term,
          category:      req.body.category,
          
      });
    console.log(newCourseFees);
    await newCourseFees.save();
    res.json({ success: "Course Fees Created SuccessFully" });
  }
  else 
  {
    return res.json({ Error: "Term fee is not proper" });
  }
  } 
  else {
    return res.json({ Error: "Term fee is not proper" });
  }
  } catch (err) {
    return res.json({ Error: err });
  }
};

//All Course Fees Details
export const getAllCourseFees = async (req, res) => {
  try {
    const allCourseFees = await courseFees.find();
    res.json(allCourseFees);
  } catch (err) {
    return res.json({ Error: err });
  }
};

//Get CourseFees
export const getCourseFees = async (req, res) => {
  try {
    const CourseFees = await courseFees.findById(req.params.id);
    res.json(CourseFees);
  } catch (err) {
    return res.json({ Error: err });
  }
};

//Update CourseFees Details
export const updateCourseFees =async(req,res)=>{
  try {
      const updatecoursefees = await courseFees.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: "true"}
        
      )
       return res.json(updatecoursefees);
    } catch (err) {
          return res.json({Error:err});
    }
  
  };

//Delete Course
export const deleteCourseFees = async(req,res)=>{
  
  try{
      await courseFees.findByIdAndDelete(req.params.id);
      return res.json({success:"Course Fees has been deleted" });
  }catch(err){
      return res.json({Error:err});
  }
};