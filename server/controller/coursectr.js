import course from "../models/Course.js";

// Create Course
export const createCourse = async (req, res) => {
  try {
    const newcourse = new course({
        courseName:   req.body.courseName,
        type:         req.body.type,
    });
    console.log(newcourse);
    await newcourse.save();
    res.json({ success: "Course Created SuccessFully" });
  } catch (err) {
    return res.json({ Error: err });
  }
};

//All Course Details
export const getAllCourse = async (req, res) => {
  try {
    const allCourses = await course.find();
    res.json(allCourses);
  } catch (err) {
    return res.json({ Error: err });
  }
};

//Get Course
export const getCourse = async (req, res) => {
  try {
    const Course = await course.findById(req.params.id);
    res.json(Course);
  } catch (err) {
    return res.json({ Error: err });
  }
};

//Update Course Details
export const updateCourse =async(req,res)=>{
  try {
      const updatecourse = await course.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: "true"}
        
      )
       return res.json(updatecourse);
    } catch (err) {
          return res.json({Error:err});
    }
  
  };

//Delete Course
export const deleteCourse = async(req,res)=>{
  
  try{
      await course.findByIdAndDelete(req.params.id);
      return res.json({success:"Course has been deleted" });
  }catch(err){
      return res.json({Error:err});
  }
};