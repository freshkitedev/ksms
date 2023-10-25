import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx'
const ExcelUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
 
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleUpload = async () => {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const fileReader = new FileReader();
      if (!selectedFile) {
        console.error("No file selected"); 
        return;
      }
    fileReader.onload = async (e) => {
      if (e.target && e.target.result) {
      const data = new Uint8Array(e.target.result);
      console.log(data)
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log(jsonData)
       // Extract column names from the first row
       const columnNames = jsonData[0];
       // Initialize an array to store the mapped JSON objects
       const mappedData = []
      // Iterate over the rows starting from the second row
      for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i];
        const name = {
          firstName: row[columnNames.indexOf("First Name")],
          lastName: row[columnNames.indexOf("Last Name")],
          middleName: row[columnNames.indexOf("Middle Name")],
        };   
        const studentCategory =  row[columnNames.indexOf("RTE")]  
        var studentGroup = row[columnNames.indexOf("Group")]
        var grade = row[columnNames.indexOf("Grade")]
         var category;
        if(studentCategory !== "")
        {
          category = "General"
        } else {
           category = "RTE"
        }
        if(studentGroup !== "") {
          grade = grade+"-"+studentGroup;
        } 
        const studentobj = {
          Name: name,
          newStudent: row[columnNames.indexOf("New/Exisiting")],
          category: category,
          grade: grade,
          section: row[columnNames.indexOf("Section")],
          group: row[columnNames.indexOf("Group")],
          mobileNo: row[columnNames.indexOf("Mobile Number")],
          admissionNo : row[columnNames.indexOf("AD.NO")],
          emisNumber: row[columnNames.indexOf("EMIS Number")],
          academicYear: row[columnNames.indexOf("FY")]
          // Add more mappings for other columns as needed
        };
         // Add the mapped object to the array
         mappedData.push(studentobj);
         const termData = [
          parseInt(row[columnNames.indexOf("T1")]),
          parseInt(row[columnNames.indexOf("T2")]),
          parseInt(row[columnNames.indexOf("T3")]),
         ]; 
         const termSize = termData.length;
          const termPaid = Array(termSize).fill(0);  
       const enrollmentobj = {
           courseName: row[columnNames.indexOf("Grade")],
           totalCharges: row[columnNames.indexOf("Total")],
           Term: termData,
           TermPaid: termPaid,
           admissionFees: row[columnNames.indexOf("AD.FEES")],
           previousYear: row[columnNames.indexOf("Prev Year")],
           oldBalance: row[columnNames.indexOf("Old Balance")],
       }
       mappedData.push(enrollmentobj);
     try {
        const response = await axios.post(
          "http://localhost:5000/api/upload/studentupload",
          { data: [studentobj, enrollmentobj] },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(response.data.message);
        //alert("success");
        //window.location.reload();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
  window.location.reload();
}
    }
    fileReader.readAsArrayBuffer(selectedFile);
  };


  return (
    <div className="card bg-light p-3">
    <h3>Upload Student Data</h3>
    <div className="input-group mb-3">
      <input
        type="file"
        className="form-control"
        onChange={handleFileChange}
        accept=".xlsx, .xls"
      />
      <button
        className="btn btn-primary"
        onClick={handleUpload}
        disabled={!selectedFile}
      >
        Upload
      </button>
    </div>
  </div>
  );
};

export default ExcelUpload;
