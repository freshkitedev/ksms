import Teacher from "../models/Teacher.js";
import { createError } from "../error.js";
//Create Teacher
export const createTeacher = async (req, res, next) => {
    try {
        const newTeacher = new Teacher({
            StaffID: req.body.StaffID,
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
            isAdim: req.body.isAdim,
            userGroup: req.body.userGroup,
            primarySubject: req.body.primarySubject,
            secondarySubject: req.body.secondarySubject,
            deptID: req.body.deptID
        })
        console.log(newTeacher);
        await newTeacher.save();
        res.status(200).send("Teacher  Created SuccessFully");
    } catch (err) {
        next(err)
    }
};

//All Teachers Details
export const getTeachers = async (req, res, next) => {
    try {
        const allTeacher = await Teacher.find();
        res.status(201).send(allTeacher);
    } catch (err) {
        next(err)
    }
};

//Particular Teacher Details 
export const getTeacher = async (req, res, next) => {

    try {
        const Teacherdetails = await Teacher.findById(req.params.id);
        res.status(201).send(Teacherdetails);
    } catch (err) {
        next(err)
    }
};

//Update Teacher Details
export const updateTeacher = async (req, res, next) => {
    try {
        const updateteacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: "true" }

        )
        return res.status(202).send(updateteacher);
    } catch (err) {
        next(err)
    }

};

//Delete Teacher
export const deleteTeacher = async (req, res, next) => {

    try {
        await Teacher.findByIdAndDelete(req.params.id);
        return res.status(204).send("Teacher has been deleted");
    } catch (err) {
        next(err)
    }
};

export const commonsearch = async (req, res, next) => {
    try{
      const query = req.body.query;
    const results = await Teacher.find(query);
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