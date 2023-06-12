import course from "../models/Course.js";
import { createError } from "../error.js";
// Create Course
export const createCourse = async (req, res, next) => {
  try {
    const courseCnt = await course.countDocuments({ courseName: req.body.courseName });
    console.log(courseCnt);
    try {
      if (courseCnt < 1) {
        const newcourse = new course({
          courseName: req.body.courseName,
          courseType: req.body.type,
        });
        console.log(newcourse);
        await newcourse.save();
        res.status(200).send("Course Created SuccessFully");
      }
      else {
        return next(createError(404, "Course already exists"));
        //return res.json({ Error: new Error("course already exists") });
      }
    } catch (err) {
      next(err)
    }
  } catch (err) {
    next(err)
  }
};

//All Course Details
export const getAllCourse = async (req, res, next) => {
  try {
    const allCourses = await course.find();
    if(allCourses != "") {
    res.status(201).send(allCourses);
    } else {
      return next(createError(500, "empty data received"))
    }
  } catch (err) {
    next(err)
  }
};

//Get Course
export const getCourse = async (req, res) => {
  try {
    const Course = await course.findById(req.params.id);
    if(Course != "") {
    res.status(201).send(Course);
    } else {
      return next(createError(500, "empty data received"))
    }
  } catch (err) {
    next(err)
  }
};

//Update Course Details
export const updateCourse = async (req, res, next) => {
  try {
    const updatecourse = await course.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: "true" }

    )
    if(updatecourse != "") {
    return res.status(202).send(updatecourse);
    } else {
      return next(createError(500, "empty data received from server"))
    }
  } catch (err) {
    next(err)
  }

};

//Delete Course
export const deleteCourse = async (req, res, next) => {

  try {
    await course.findByIdAndDelete(req.params.id);
    return res.status(204).send("Course has been deleted");
  } catch (err) {
    next(err)
  }
};

export const commonsearch = async (req, res, next) => {
  try{
    const query = req.body.query; 
  const results = await course.find(query);
  // Return the search results
  if(results != "") {
    console.log("check");
   // const results = await cursor.toArray();
    // Return the search results
    return res.status(201).send(results);
    }else {
      console.log("error")
      return next(createError(500, "cannot retrieve data"))
    }
  } catch(err) {
    nexr(err)
  }
};