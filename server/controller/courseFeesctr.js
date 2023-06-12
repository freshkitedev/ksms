import courseFees from "../models/CourseFees.js";
import { createError } from "../error.js";
// Create CourseFees
export const createCourseFees = async (req, res, next) => {
  try {
    const query = {
      courseName: req.body.courseName,
      studentCategory: req.body.studentCategory,
      year: req.body.year
    };
    const courseCnt = await courseFees.countDocuments(query);
    console.log(courseCnt)
    if (courseCnt < 1) {
      const category = req.body.courseCategory
      console.log(category)
      if (category == "Academic") {
        //const Term = req.body.Term
        if(req.body.otherFees != "") 
        {
          const newadmCourseFees = new courseFees({
            courseName: req.body.courseName,
            courseId: req.body.courseId,
            year: req.body.year,
            totalCharges: req.body.totalCharges,
            frequency: req.body.frequency,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            status: req.body.status,
            otherFees: req.body.otherFees,
            courseCategory: req.body.courseCategory,
            studentCategory: req.body.studentCategory

          });
          console.log(newadmCourseFees);
          await newadmCourseFees.save();
          res.status(200).send("Course Fees Created SuccessFully for admission fees");
        }
        //var sum = 0
        else {
        console.log(Term)
        const frequency = req.body.frequency
        console.log(frequency)
        const totalCharges = req.body.totalCharges
        console.log(totalCharges)
        const feeCategory = req.body.studentCategory
        if (feeCategory == "General") {
          const l = Term.length
          console.log(l);
          if (l == frequency) {
            var sum = 0
            Term.forEach(item => {
              sum += item;
            });
            console.log(sum);
            if (sum == totalCharges) {
              const newCourseFees = new courseFees({
                courseName: req.body.courseName,
                courseId: req.body.courseId,
                year: req.body.year,
                totalCharges: req.body.totalCharges,
                frequency: req.body.frequency,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                status: req.body.status,
                Term: req.body.Term,
                courseCategory: req.body.courseCategory,
                studentCategory: req.body.studentCategory

              });
              console.log(newCourseFees);
              await newCourseFees.save();
              res.status(200).send("Course Fees Created SuccessFully");
            }
            else {
              return next(createError(404, "Term fee not proper"));
            }
          }
          else {
            return next(createError(500, "Term Fee is not proper"))
          }
        }
        else if (feeCategory == "RTE") {
          if (Term.length == frequency) {
            var sum = 0
            Term.forEach(item => {
              sum += item;
            });
            console.log(sum);
            var rteFees = req.body.rteFees
            if (sum + rteFees == totalCharges + rteFees) {
              const newCourseFees = new courseFees({
                courseName: req.body.courseName,
                courseId: req.body.courseId,
                year: req.body.year,
                totalCharges: req.body.totalCharges,
                frequency: req.body.frequency,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                status: req.body.status,
                Term: req.body.Term,
                category: req.body.category,
                rteFees: req.body.rteFees,
                courseCategory: req.body.courseCategory,
                studentCategory: req.body.studentCategory,

              });
              console.log(newCourseFees);
              await newCourseFees.save();
              res.status(200).send("Course Fees Created SuccessFully");
            }
            else {
              return next(createError(404, "Term fee not proper"));
            }
          }
          else {
            return next(createError(500, "Term Fee is not proper"))
          }

        }
        else {
          console.log("last else");
          const newCourseFees = new courseFees({
            courseName: req.body.courseName,
            courseId: req.body.courseId,
            year: req.body.year,
            totalCharges: req.body.totalCharges,
            frequency: req.body.frequency,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            status: req.body.status,
            category: req.body.category,
            rteFees: req.body.rteFees,
            courseCategory: req.body.courseCategory,
            studentCategory: req.body.studentCategory,
            otherFees: req.body.otherFees

          });
          console.log(newCourseFees);
          await newCourseFees.save();
          res.status(200).send("Course Fees Created SuccessFully");

        } 
      }
      }
      else {
        {
          const newCourseFees = new courseFees({
            courseName: req.body.courseName,
            courseId: req.body.courseId,
            year: req.body.year,
            totalCharges: req.body.totalCharges,
            frequency: req.body.frequency,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            status: req.body.status,
            category: req.body.category,
            rteFees: req.body.rteFees,
            otherFees: req.body.otherFees,
            courseCategory: req.body.courseCategory,
            studentCategory: req.body.studentCategory,
          });
          console.log(newCourseFees);
          await newCourseFees.save();
          res.status(200).send("Course Fees Created SuccessFully");
        }
      }
    }
    else {
      return next(createError(500, "Course Fees already defined"))
    }
  } catch (err) {
    next(err)
  }
};

//All Course Fees Details
export const getAllCourseFees = async (req, res, next) => {
  try {
    const allCourseFees = await courseFees.find();
    if(allCourseFees != "") {
    res.status(201).send(allCourseFees);
    } else {
      return next(createError(500, "empty data received"))
    }
  } catch (err) {
    next(err)
  }
};

//Get CourseFees
export const getCourseFees = async (req, res, next) => {
  try {
    const CourseFees = await courseFees.findById(req.params.id);
    if(CourseFees != "") {
    res.status(201).send(CourseFees);
    } else {
      return next(createError(500, "empty data received"))
    }
  } catch (err) {
    next(err)
  }
};

//Update CourseFees Details
export const updateCourseFees = async (req, res, next) => {
  try {
    const updatecoursefees = await courseFees.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: "true" }

    )
    if(updatecoursefees != "") {
    return res.status(202).send(updatecoursefees);
    } else {
      return next(500, "empty data received")
    }
  } catch (err) {
    next(err)
  }

};

//Delete Course
export const deleteCourseFees = async (req, res, next) => {

  try {
    await courseFees.findByIdAndDelete(req.params.id);
    return res.status(204).send("Course Fees has been deleted");
  } catch (err) {
    next(err)
  }
};

export const commonsearch = async (req, res, next) => {
  try{
    const query = req.body.query;
    console.log("inside common search ");
  const results = await courseFees.find(query);
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
    next(err)
  }
};