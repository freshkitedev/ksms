import student from "../models/Student.js";

// Create Student
export const createStudent = async (req, res) => {
  try {
    const newStudent = new student({
      student_id: req.body.student_id,
      rollNo: req.body.rollNo,
      name: req.body.name,
      standard: req.body.standard,
      section: req.body.section,
      fatherName: req.body.fatherName,
      motherName: req.body.motherName,
      address: req.body.address,
      mobileNo: req.body.mobileNo,
    });
    console.log(newStudent);
    await newStudent.save();
    res.json({ success: "User Created SuccessFully" });
  } catch (err) {
    return res.json({ Error: err });
  }
};

//getstudents
export const getstudents = async (req, res) => {
  try {
    const allStudents = await student.find();
    res.json(allStudents);
  } catch (err) {
    return res.json({ Error: err });
  }
};

//getstudent

export const getstudent = async (req, res) => {
  try {
    const student = await student.findOne(req.params.id);
    res.json(student);
  } catch (err) {
    return res.json({ Error: err });
  }
};
