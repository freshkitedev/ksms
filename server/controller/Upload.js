import course from "../models/Course.js";
import { createError } from "../error.js";
import XLSX from 'xlsx'
import path from 'path'
import fs from 'fs'

const filePath = path.join(".", './Book1.xlsx');
var xlData
if (fs.existsSync(filePath)) {
const workbook = XLSX.readFile('Book1.xlsx');
const sheet_name_list = workbook.SheetNames;
xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
} else {
    console.log(`File not found: ${filePath}`);
  }
export const xlupload = async (req, res) => {
    try {
xlData.forEach((doc) => {
    console.log('test')
    course.insertOne(doc, (err, result) => {
        console.log('insert')
      if (err) throw err;
      console.log(`${result.insertedCount} documents inserted`);
    });
  });
} catch (err) {
    return res.json({ Error: err });
  }
};
