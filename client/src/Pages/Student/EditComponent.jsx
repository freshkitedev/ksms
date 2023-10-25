import React, { useState } from "react";
import axios from"axios";

const EditStudentForm = ({ student, onUpdate, onCancel }) => {
  const [updatedStudent, setUpdatedStudent] = useState(student);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Split the name into individual parts
    const [parent, child] = name.split(".");

    setUpdatedStudent((prevState) => ({
      ...prevState,
      [parent]: {
        ...prevState[parent],
        [child]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API call to update the student in the database
      const response = await axios.put(`http://localhost:5000/api/student/update/${updatedStudent._id}`, updatedStudent);

      if (true) {
        // Update the student locally if the API call is successful
        alert("successfully updated")
        onUpdate(updatedStudent);
       
      } else {
        // Handle the case when the API call fails
        console.error("Failed to update student");
      }
    } catch (error) {
      console.error("Error occurred while updating student", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Roll Number</label>
        <input
          type="text"
          className="form-control"
          name="rollNumber"
          value={updatedStudent.rollNumber}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          className="form-control"
          name="Name.fName"
          value={updatedStudent.Name.fName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Middle Name</label>
        <input
          type="text"
          className="form-control"
          name="Name.mName"
          value={updatedStudent.Name.mName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          className="form-control"
          name="Name.lName"
          value={updatedStudent.Name.lName}
          onChange={handleChange}
        />
      </div>
      {/* Add other input fields for the remaining student properties */}
      <button type="submit" className="btn btn-primary mr-2">
        Update
      </button><br></br>&nbsp;
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditStudentForm;
