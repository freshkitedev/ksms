import React, { useState, useEffect } from "react";
import axios from "axios";
const AddCourseFeeForm = ({ courseFee, onUpdate, onCancel }) => {
  const [updatedCourseFee, setUpdatedCourseFee] = useState(courseFee);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCourseFee((prevCourseFee) => ({
      ...prevCourseFee,
      [name]: value
    }));
  };
  
  const handleCancel = () => {
    onCancel(); // Notify parent component to cancel editing
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/coursefees/updatefees/${courseFee._id}`, updatedCourseFee);
      // Handle success or perform any necessary actions
      console.log("Course fee updated successfully");
      onUpdate(); // Notify parent component of the update
    } catch (error) {
      // Handle error
      console.error("Failed to update course fee:", error);
    }
  };

  return (<div className="formedit">
    <form className="card p-2" onSubmit={handleSubmit}>
      {/* Render input fields for editing course fee attributes */}
      <div className="mb-3">
        <label className="form-label">CourseName:</label>
        <input
          type="text"
          name="coursename"
          value={updatedCourseFee.courseId}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
     
      <div className="mb-3">
        <label className="form-label">Total Charges:</label>
        <input
          type="text"
          name="totalCharges"
          value={updatedCourseFee.totalCharges}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Year:</label>
        <input
          type="text"
          name="year"
          value={updatedCourseFee.year}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label">BookFees:</label>
        <input
          type="text"
          name="BookFees"
          value={updatedCourseFee.year}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Term:</label>
        <input
          type="text"
          name="Term"
          value={updatedCourseFee.Term}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
     
     
      {/* Add more input fields for other attributes */}

      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form></div>
  );
};


export default AddCourseFeeForm;