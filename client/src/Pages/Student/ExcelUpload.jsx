import React, { useState,useEffect } from 'react';
import axios from 'axios';

const ExcelUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
 
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Send a POST request to the backend API endpoint for uploading the file
      await axios.post('http://localhost:5000/api/upload/studentupload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
     alert("Uploaded Succesfully")
      console.log('File uploaded successfully');
      window.location.reload();
    
      
    } catch (error) {
      console.error('Error uploading file:', error);
    }
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
