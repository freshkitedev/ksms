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
       
      };
      const coursedata = await course.findOne({ courseName: req.body.grade })
      const courseFeedata = await courseFees.findOne(query)
      console.log(courseFeedata)
      const Studentcnt = await student.countDocuments({ admissionNo: req.body.admissionNo });
      console.log(Studentcnt)
      if (Studentcnt < 1) {
        const newStudent = new student({
          Name: {
            fName: req.body.fname,
            mName: req.body.mname,
            lName: req.body.lname,
          },
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
          admissionFeeCategory: req.body.admissionFeeCategory,
        });
        console.log(newStudent);
        await newStudent.save();
        console.log("student saved");
        if(req.body.newStudent) {
          const coursecnt = await course.countDocuments({ courseName: req.body.admissionFeeCategory })
          console.log(coursecnt)
          if (coursecnt > 0) {
            const query = {
              courseName: req.body.admissionFeeCategory,
              year: req.body.academicYear
            };
            const coursedata = await course.findOne({ courseName: req.body.admissionFeeCategory})
            if(coursedata != "") {
            console.log(coursedata)
            } else {
              return next(createError(500, "empty data received"))
            }
            const courseFeedata = await courseFees.findOne(query)
            if(courseFeedata != "") {
            console.log(courseFeedata)
            } else {
              return next(createError(500, "empty data received"))
            }
            
            const admenrollment = new enrollment({
              year: req.body.academicYear,
              userId: newStudent.rollNumber,
              totalPaid: 0,
              totalCharges: courseFeedata.totalCharges,
              courseName: req.body.admissionFeeCategory,
              courseId: coursedata.courseId,
              feesCategory: "admissionFees",
              balance: courseFeedata.totalCharges,
            })
            console.log(admenrollment)
            await admenrollment.save();
            console.log("Successfully saved admission fee enrollment")
          }
        } else {
          console.log("old student")
        }
        console.log("course fee data", courseFeedata.Term)
        const termData = courseFeedata.Term;
        const termValueCopy = JSON.parse(JSON.stringify(termData));
        var TermPaid = termValueCopy;
        console.log("Term Paid data", TermPaid);
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
          feesCategory: "termFees"
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
            if(coursedata != "") {
            console.log(coursedata)
            } else {
              return next(createError(500, "empty data received"))
            }
            const courseFeedata = await courseFees.findOne(query)
            if(courseFeedata != "") {
            console.log(courseFeedata)
            } else {
              return next(createError(500, "empty data received"))
            }
            const vanStop = req.body.vanStop
            console.log(vanStop)
            const vanenrollment = new enrollment({
              year: req.body.academicYear,
              userId: newStudent.rollNumber,
              totalPaid: 0,
              totalCharges:  courseFeedata.totalCharges,
              section: req.body.section,
              courseName: req.body.vanStop,
              courseId: coursedata.courseId,
              feesCategory: "vanFees",
              balance: courseFeedata.totalCharges,
            })
            console.log(vanenrollment)
            await vanenrollment.save();
            console.log("Successfully saved enrollment")
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
    if(allStudents != "") {
    res.status(201).send(allStudents);
    } else {
      return next(createError(500, "empty data received"))
    }
  } catch (err) {
    next(err)
  }
};

//Particular Student Details
export const getstudent = async (req, res, next) => {
  try {
    const rollnumber = req.params.id
    const Student = await student.findOne({rollNumber: rollnumber});
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

export const getstudentByName = async (req, res, next) => {
  try {
    console.log("inside get by name")
    const studentName = req.body.fName;
    console.log(studentName)
    const Student = await student.find({"Name.fName": studentName})
    console.log(Student)
    res.status(201).json(
      {
        status: "success",
        details: Student,
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