import Course from "../models/CourseFees.js";
import Student from "../models/Student.js";
import { createError } from "../error.js";
import XLSX from "xlsx";

/*var upload = multer({dest: "uploads/"});

export const xlupload = async (req, res, next) => {
  try {
    const file = req.file;

    if (file == null || file == "undefined") {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    else {
      var filepath = "uploads" + req.file;
      const excelData = excelToJson({
        sourceFile: filepath,
        header: {
          rows: 1,
        },
        columntoKey: {
          "*": "{{columnHeader}}",
        }
      });
      fs.remove(filepath);
      res.status92zzzzzz
    }

  } catch(err) {
    next(err)
  }
}*/
// Process uploaded Excel file
export const xlupload = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const workbook = XLSX.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    console.log('xlData:', xlData); // Check the xlData in the console

    // ...

    const formattedData = xlData.map((row) => ({
      FeesId: row.courseId.toString(),
      courseName: row.courseName,
      courseId: row.courseId,
      year: row.year,
      totalCharges: row.totalCharges,
      frequency: row.frequency,
      startDate: new Date((row.startDate - 25569) * 86400 * 1000), // Convert Excel serial date to JavaScript date
      endDate: new Date((row['endDate '] - 25569) * 86400 * 1000), // Convert Excel serial date to JavaScript date
      status: row['status '],
      Term: [row['Term ']],
      category: row['category   '],
    }));


    // ...

    console.log('formattedData:', formattedData); // Check the formattedData in the console

    // Validate the data and ensure 'courseName' field is present
    if (!formattedData.every((row) => row.courseName)) {
      throw createError(400, "Invalid data: courseName is required");
    }

    // Insert the course fee data into the database
    const insertedData = await Course.insertMany(formattedData);

    res.json({ message: `${insertedData.length} documents inserted` });
  } catch (error) {
    console.error('Failed to upload course fee data:', error);
    res.status(500).json({ error: 'Failed to upload course fee data' });
  }
};


export const uploadStudents = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const workbook = XLSX.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    console.log('xlData:', xlData); // Check the xlData in the console

    // ...

    const formattedData = xlData.map((row) => ({
      Name: {
        fName: row.FirstName,
        mName: row.MiddleName,
        lName: row.LastName,
      }, // Convert date string to JavaScript date
      fatherName: row.fatherName,
      motherName: row.motherName,
      homeAddress: row.homeAddress, // Convert date string to JavaScript date
      emailID: row.emailID,
      mobileNo: row.MobileNumber, // Convert date string to JavaScript datenew Date((row.startDate - 25569) * 86400 * 1000)
      activeIndicator: row.activeIndicator,
      userGroup: row.userGroup,
      grade: row.Grade,
      section: row.Section,
      group: row.Group,
      emisNumber: row.EMISNumber,
      admissionNo: row.AdmissionNo,
      category: row.category,
      academicYear: row.academicYear,
      concessionApplicable: row.concessionApplicable,
      vanApplicable: row.vanApplicable,
      vanStop: row.vanStop,
      newStudent: row.newStudent,
    }));

    // ...

    console.log('formattedData:', formattedData); // Check the formattedData in the console

    // Validate the data and ensure 'Name' fields are present
   // if (!formattedData.every((row) => row.Name.fName && row.Name.lName)) {
     // throw createError(400, "Invalid data: First name and last name are required");
   // }

    // Insert the student data into the database
    const insertedData = await Student.insertMany(formattedData);
    console.log('insertedData:', `${insertedData.length} documents inserted`);
    res.json({ message: `${insertedData.length} documents inserted` });
  } catch (error) {
    console.error('Failed to upload student data:', error);
    res.status(500).json({ error: 'Failed to upload student data' });
  }
};
