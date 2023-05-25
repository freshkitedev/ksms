import Course from "../models/CourseFees.js";
import { createError } from "../error.js";
import XLSX from "xlsx";

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
// Route for file upload
