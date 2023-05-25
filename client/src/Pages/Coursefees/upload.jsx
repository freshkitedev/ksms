import React, { useState } from "react";
import axios from "axios";

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

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload/xl",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(response.data.message);
      alert("success");
      window.location.reload();
      // Handle successful upload
    } catch (error) {
      console.error("Failed to upload file:", error.response.data.error);
      // Handle upload error
    }
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

