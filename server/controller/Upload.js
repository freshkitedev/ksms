import CourseFees from "../models/CourseFees.js";
import Student from "../models/Student.js";
import course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import { createError } from "../error.js";


// Process uploaded Excel file
export const xlupload = async (req, res, next) => {

  console.log("hi");
  console.log(req.body.data)
  try {
      const courses = req.body.data; // Assuming req.body contains the course fees object
      const coursecnt = await course.countDocuments({ courseName: courses.courseName })
      console.log(coursecnt)
      if(coursecnt) {
      const coursefees = new CourseFees(courses);
      await coursefees.save();
      console.log("coursefee saved");
        res.status(200).send(coursefees);
      }
      else {
        return next(createError(500, "course is not registered"));
      }
  } catch(err) {
    next(err)
  }
};


export const uploadStudents = async (req, res, next) => {
  try {
    console.log("inside upload studnets");
    const studentdata = req.body.data[0]; // Assuming req.body contains the array of student objects
    const enrollmentdata = req.body.data[1];
    console.log(enrollmentdata);
    console.log(studentdata)
    /*for (const studentData of studentdata) {
      const students = new Student(studentData);
      await students.save();
    }*/
    const coursecnt = await course.countDocuments({ courseName: studentdata.grade })
      console.log(coursecnt)
      if(coursecnt) {
        const studentregister = new Student(studentdata);
        await studentregister.save();
        console.log("student data saved");
        res.status(200).send(studentregister);
        if(studentdata.newStudent == "NEW") {
          var query = {
            totalCharges: enrollmentdata.totalCharges,
            year: studentdata.academicYear
          }
          const CourseFeesdata = await CourseFees.findOne(query);
          console.log(CourseFeesdata);
          var admissionEnrollment = new Enrollment({
              year: studentdata.academicYear,
              userId: studentregister.rollNumber,
              totalPaid: 0,
              totalCharges: enrollmentdata.totalCharges,
              courseName: CourseFeesdata.courseName,
              courseId: CourseFeesdata.courseId,
              feesCategory: "admissionFees",
              balance: enrollmentdata.totalCharges,
          })
          console.log(admissionEnrollment)
          await admissionEnrollment.save();
          console.log("Successfully saved admission fee enrollment")
        } else {
          console.log("existing student");
        }
        var query = {
          courseName: enrollmentdata.courseName,
          year: studentdata.academicYear
        }
        const TermCourseFeesdata = await CourseFees.findOne(query);
        if(TermCourseFeesdata != ""){
        console.log(TermCourseFeesdata);
        var termEnrollment = new Enrollment({
              year: studentdata.academicYear,
              userId: studentregister.rollNumber,
              totalPaid: 0,
              totalCharges: enrollmentdata.totalCharges,
              courseName: enrollmentdata.courseName,
              courseId: TermCourseFeesdata.courseId,
              term: enrollmentdata.Term,
              termPaid: enrollmentdata.TermPaid,
              feesCategory: "termFees",
              balance: enrollmentdata.totalCharges,
        })
      }
      console.log(termEnrollment)
      await termEnrollment.save();
    } else {
      return next(createError(500, "course fees is not defined"));
    }
      console.log("Successfully saved term fee enrollment")
      if(enrollmentdata.previousYear != "") {
        const prevEnrollment = new Enrollment ({
              year: enrollmentdata.previousYear,
              userId: studentregister.rollNumber,
              totalPaid: 0,
              totalCharges: enrollmentdata.oldBalance,
              courseName: enrollmentdata.courseName,
              courseId: TermCourseFeesdata.courseId,
              feesCategory: "oldFees",
              balance: enrollmentdata.oldBalance,
        });
        console.log(prevEnrollment);
        await prevEnrollment.save();
        console.log("Succesfully saved old year enrollment");
      }
    res.status(200).send("success");
  } catch (error) {
    console.error('Failed to upload student data:', error);
    return next(createError(500, "failed to upload data"));
  }
};
