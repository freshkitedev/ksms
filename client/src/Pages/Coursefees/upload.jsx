import React, { useState } from "react";
import axios from "axios";

import * as XLSX from 'xlsx'
const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = async (e) => {
      if (e.target && e.target.result) {
      const data = new Uint8Array(e.target.result);
      console.log(data)
      console.log("hi")
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log(jsonData)
       // Extract column names from the first row
       const columnNames = jsonData[0];

       // Initialize an array to store the mapped JSON objects
       const mappedData = [];

      // Iterate over the rows starting from the second row
      for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i];
        const termValues = [
          parseInt(row[columnNames.indexOf("Term1")]),
          parseInt(row[columnNames.indexOf("Term2")]),
          parseInt(row[columnNames.indexOf("Term3")]),
        ];
        const obj = {
          courseName: row[columnNames.indexOf("CourseName")],
          courseId: row[columnNames.indexOf("CourseId")],
          year: row[columnNames.indexOf("Year")],
          studentCategory: row[columnNames.indexOf("StudentCategory")],
          courseCategory: row[columnNames.indexOf("CourseCategory")],
          totalCharges: row[columnNames.indexOf("TotalCharges")],
          Term: termValues
          // Add more mappings for other columns as needed
        };
         // Add the mapped object to the array
         mappedData.push(obj);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/upload/xl",
          { data: obj },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log(response.data.message);
        //alert("success");
        //window.location.reload();
        // Handle successful upload
      } catch (error) {
        console.error("Failed to upload file:", error.response.data.error);
        // Handle upload error
      }
    }
    window.location.reload();
    }
    };

    fileReader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div className="card bg-light p-3" >
        <h3>Excel upload Here!....</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="input-group mb-3">
          <input
            type="file"
            name="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="form-control"
          />
          <label className="input-group-text" htmlFor="file">
            <i className="bi bi-file-plus-fill"></i>
          </label>
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          style={{ borderRadius: "15px" }}
        >
          Upload
        </button>
      </form>
    </div>
  );
};
export default UploadForm

