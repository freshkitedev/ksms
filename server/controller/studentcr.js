import student from "../models/Student.js";
import course from "../models/Course.js";
import courseFees from "../models/CourseFees.js"
import enrollment from "../models/Enrollment.js"
import { createError } from "../error.js";
// Create Student
export const createStudent = async (req, res, next) => {
  try {
    const coursecnt = await course.countDocuments({ courseName: req.body.grade })
    console.log(coursecnt)
    if (coursecnt > 0) {
      const query = {
        courseName: req.body.grade,
        year: req.body.academicYear,
        studentCategory: req.body.category,
      };
      const coursedata = await course.findOne({ courseName: req.body.grade })
      const courseFeedata = await courseFees.findOne(query)
      console.log(courseFeedata)
      const Studentcnt = await student.countDocuments({ admissionNo: req.body.admissionNo });
      console.log(Studentcnt)
      if (Studentcnt < 1) {
        const newStudent = new student({
          Name: req.body.Name,
          dateOfBirth: req.body.dateOfBirth,
          fatherName: req.body.fatherName,
          motherName: req.body.motherName,
          homeAddress: req.body.homeAddress,
          enrollmentDate: req.body.enrollmentDate,
          emailID: req.body.emailID,
          mobileNo: req.body.mobileNo,
          lastDate: req.body.lastDate,
          activeIndicator: req.body.activeIndicator,
          userGroup: req.body.userGroup,
          emisNumber: req.body.emisNumber,
          admissionNo: req.body.admissionNo,
          category: req.body.category,
          group: req.body.group,
          grade: req.body.grade,
          section: req.body.section,
          academicYear: req.body.academicYear,
          concessionApplicable: req.body.concessionApplicable,
          vanApplicable: req.body.vanApplicable,
          vanStop: req.body.vanStop,
          newStudent: req.body.newStudent,
        });
        console.log(newStudent);
        await newStudent.save();
        console.log("course fee data", courseFeedata.Term)
        const termData = courseFeedata.Term;
        const termValueCopy = JSON.parse(JSON.stringify(termData));
        var TermPaid = termValueCopy;
        console.log("TErm Paid data", TermPaid);
        TermPaid.fill(0);
        console.log("TermPaid",TermPaid);
        console.log(courseFeedata.totalCharges)
        const newenrollment = new enrollment({
          year: req.body.academicYear,
          userId: newStudent.rollNumber,
          totalCharges: courseFeedata.totalCharges,
          totalPaid: 0,
          balance: courseFeedata.totalCharges,
          termPaid: TermPaid,
          term: courseFeedata.Term,
          courseName: req.body.grade,
          section: req.body.section,
          courseId: coursedata.courseId,
          feesCategory: "termFees",
          bookFees: courseFeedata.bookFees,
          bookFeesBalance: courseFeedata.bookFees,
          admissionFees: courseFeedata.admissionFees,
          admissionFeesBalance: courseFeedata.admissionFees
        })
        console.log(newenrollment)
        await newStudent.save();
        await newenrollment.save();
        const van = req.body.vanApplicable
        if (van) {
          const coursecnt = await course.countDocuments({ courseName: req.body.vanStop })
          console.log(coursecnt)
          if (coursecnt > 0) {
            const query = {
              courseName: req.body.vanStop,
              year: req.body.academicYear
            };
            const coursedata = await course.findOne({ courseName: req.body.vanStop })
            console.log(coursedata)
            const courseFeedata = await courseFees.findOne(query)
            console.log(courseFeedata)
            //const vanStop = req.body.vanStop
            const newenrollment = new enrollment({
              year: req.body.academicYear,
              userId: newStudent.rollNumber,
              vanFees: courseFeedata.vanFees,
              totalPaid: 0,
              vanFeesPaid: 0,
              section: req.body.section,
              courseName: req.body.vanStop,
              courseId: coursedata.courseId,
              feesCategory: "vanFees",
              vanFeesbalance: courseFeedata.vanFees,
            })
            console.log(newenrollment)
            await newenrollment.save();
          }
          else {
            next(createError(500, "Fee is not defined for van"))
          }
        }
        var response = [newStudent, newenrollment] 
        res.status(200).send(response);
      }
      else {
        return next(createError("500", "user already exists"))
      }
    }
    else {
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
    const query = {
      userId: req.body.rollNumber
    }
    const Studentfees = await enrollment.find(query);
    res.status(201).json(
      {
        status: "success",
        details: Student,
        fees: Studentfees,
      });
  } catch (err) {
    next(err)
  }
};

//Update Student Details
export const updateStudent = async (req, res, next) => {
  try {
    const updatestudent = await student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: "true" }

    )
    return res.status(201).send(updatestudent);
  } catch (err) {
    next(err)
  }

};

//Delete Student
export const deleteStudent = async (req, res, next) => {

  try {
    await student.findByIdAndDelete(req.params.id);
    return res.status(204).send("Student has been deleted");
  } catch (err) {
    next(err)
  }
};

export const commonsearch = async (req, res, next) => {
  try{
    const query = req.body.query;
  const results = await student.find(query).toArray();
  // Return the search results
  return results;
  } catch(err) {
    nexr(err)
  }
};