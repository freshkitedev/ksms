import courseFees from "../models/CourseFees.js";
import { createError } from "../error.js";
// Create CourseFees
export const createCourseFees = async (req, res, next) => {
  try {
    const query = {
      courseName: req.body.courseName,
      category: req.body.category
    };
    const courseCnt = await courseFees.countDocuments(query);
    console.log(courseCnt)
    if(courseCnt < 1) 
    {
    const Term = req.body.Term
    console.log(Term) 
    const frequency = req.body.frequency
    console.log(frequency)
    const totalCharges = req.body.totalCharges
    console.log(totalCharges)
    const feeCategory = req.body.category
    if(feeCategory == "General") 
    {
    if( Term.length == frequency) 
    {
      var sum = 0 
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
    res.status(200).send("Course Fees Created SuccessFully");
      }
      else 
    {
      return next(createError(404,"Term fee not proper"));
    }
  }
  else 
  {
    return next(createError(500, "Term Fee is not proper"))
  }
} 
else 
{
  if( Term.length == frequency) 
    {
      var sum = 0 
      Term.forEach(item => {
        sum += item;
      });
      console.log(sum);
      var rteFees = req.body.rteFees
      if(sum + rteFees == totalCharges+rteFees ) 
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
          rteFees:       req.body.rteFees,
          
      });
    console.log(newCourseFees);
    await newCourseFees.save();
    res.status(200).send("Course Fees Created SuccessFully");
      }
      else 
    {
      return next(createError(404,"Term fee not proper"));
    }
  }
  else 
  {
    return next(createError(500, "Term Fee is not proper"))
  }

}
  } 
  else {
    return next(createError(500,"Course Fees already defined"))
  }
  } catch (err) {
    next(err)
  }
};

//All Course Fees Details
export const getAllCourseFees = async (req, res, next) => {
  try {
    const allCourseFees = await courseFees.find();
    res.status(201).send(allCourseFees);
  } catch (err) {
    next(err)
  }
};

//Get CourseFees
export const getCourseFees = async (req, res, next) => {
  try {
    const CourseFees = await courseFees.findById(req.params.id);
    res.status(201).send(CourseFees);
  } catch (err) {
    next(err)
  }
};

//Update CourseFees Details
export const updateCourseFees =async(req, res, next)=>{
  try {
      const updatecoursefees = await courseFees.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: "true"}
        
      )
       return res.status(202).send(updatecoursefees);
    } catch (err) {
        next(err)
    }
  
  };

//Delete Course
export const deleteCourseFees = async(req,res, next)=>{
  
  try{
      await courseFees.findByIdAndDelete(req.params.id);
      return res.status(204).send("Course Fees has been deleted");
  }catch(err){
     next(err)
  }
};