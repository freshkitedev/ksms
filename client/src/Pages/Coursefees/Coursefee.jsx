import React, { useEffect, useState } from "react";
import axios from "axios";

import EditCourseFeeForm from "./formedit";
import AddCourseFeeForm from "./AddCourseFeeForm";
import UploadForm from "./upload";

const CourseFeesComponent = () => {
  const [courseFees, setCourseFees] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editCourseFee, setEditCourseFee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [viewCourseFee, setViewCourseFee] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  
  const toggleForm = () => {
    setShowForm(!showForm);
    setViewMode(false);
    setViewCourseFee(null);
  };

  const toggleViewMode = (courseFee) => {
    if (viewMode) {
      setViewMode(false);
      setViewCourseFee(null);
    } else {
      setViewMode(true);
      setViewCourseFee(courseFee);
    }
  };

  // Enable editing for a specific course fee
  const handleEdit = (courseFee) => {
    setEditCourseFee(courseFee);
    setEditMode(true);
    console.log(courseFee);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditCourseFee(null);
  };

  const handleUpdate = () => {
    setEditMode(false);
    setEditCourseFee(null);
    getAllCourseFees();
  };

  const handleAddCourseFee = async (courseFee) => {
    try {
      console.log(courseFee);
      await axios.post(
        "http://localhost:5000/api/coursefees/createCourseFees",
        courseFee
      );
      // Handle success or perform any necessary actions
      alert("created Success");
      getAllCourseFees();
    } catch (error) {
      // Handle error
      if (error.response) {
        const errorMessage = error.response.data.message;
        console.log(errorMessage); // You can log the error message for debugging purposes
        alert(`Error: ${errorMessage}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        // Handle the request error in the UI or perform any necessary actions
        alert("Error: No response received from the server.");
      } else {
        console.log("Error", error.message);
        alert(`Error: ${error.message}`);
      }
      // Handle any other error related to the request or perform any necessary actions
    }
  };

  const handleExcelUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload/xl",
        formData
      );
      console.log("Excel data uploaded successfully!");
      console.log("Server response:", response.data);

      getAllCourseFees();
    } catch (error) {
      console.error("Failed to upload Excel data:", error);
    }
  };

  // Get all Course Fees
  const getAllCourseFees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/coursefees/getcoursefees"
      );
      const allCourseFees = response.data;
      setCourseFees(allCourseFees);
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  // Delete Course Fee by ID
  const deleteCourseFeeById = async (courseFeeId) => {
    try {
      alert("Are you sure you want to delete the course fee?");
      await axios.delete(
        `http://localhost:5000/api/coursefees/deletefees/${courseFeeId}`
      );
      // Handle success or perform any necessary actions
      console.log("Course fee deleted successfully");

      // Call the function to refresh the course fees list
      getAllCourseFees();
    } catch (error) {
      // Handle error
      console.error("Failed to delete course fee:", error);
    }
  };

  useEffect(() => {
    // Call functions to retrieve or perform necessary actions on course fees
    getAllCourseFees();

    // Or call other CRUD functions as needed
  }, []);

  return (
    <div className="Coursefee" >
        <h2 style={{textAlign:"center", fontFamily:"fantasy", color:"white"}}>  Course Fee Details</h2>
             <div className="d-flex justify-content-center align-items-center">



<div className="d-flex flex-column align-items-center ">
  {showForm && <AddCourseFeeForm onAdd={handleAddCourseFee} />}
  <br />
  <button className="btn btn-info mb-3" onClick={toggleForm}>
    {showForm ? "Hide Course Fee Form" : "Add New Course Fees Here!..."}
  </button>
</div></div>

     

      <div className="d-flex justify-content-center align-items-center">
        {!showUploadForm && (
          <div className="d-flex flex-column align-items-center">
            <button
              className="btn btn-primary mb-3"
              onClick={() => setShowUploadForm(true)}
            >
              Show Excel Upload Form
            </button>
          </div>
        )}
        {showUploadForm && (
          <div className="d-flex flex-column align-items-center">
            <UploadForm onUpload={handleExcelUpload} />
            <button
              className="btn btn-secondary mt-3"
              onClick={() => setShowUploadForm(false)}
            >
              Hide Upload Form
            </button>
          </div>
        )}
      </div>

      <div className=" table-container p-5" style={{transform:"scale(0.9)"}}>
        <table className="table table-primary" style={{fontFamily:"cursive"}}>
          {/* table header */}
          <thead className="text-primary">
            <tr >
              <th >Course Name</th>
             
              <th >Year</th>
              <th>Frequency</th>
              <th>Student Category</th>
              <th>Rte Fees</th>
              <th>Total Charges</th>
              <th>Term</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Category</th>
              <th>Update</th>
              <th>Delete</th>
              <th>View</th>
            </tr>
          </thead>

          {/* table body */}
          <tbody>
            {courseFees.map((courseFee) => (
              <tr key={courseFee._id}>
                <td>{courseFee.courseName}</td>
               
                <td>{courseFee.year}</td>
                <td>{courseFee.frequency}</td>
                <td>{courseFee.studentCategory}</td>
                <td>{courseFee.rteFees}</td>
                <td>{courseFee.totalCharges}</td>
                <td>{courseFee.Term}</td>
                <td>{courseFee.startDate}</td>
                <td>{courseFee.endDate}</td>
                <td>{courseFee.status ? "Active" : "Inactive"}</td>
                <td>{courseFee.category}</td>
                <td>
                  {editMode &&
                  editCourseFee &&
                  editCourseFee._id === courseFee._id ? (
                    <EditCourseFeeForm
                      courseFee={editCourseFee}
                      onUpdate={handleUpdate}
                      onCancel={handleCancelEdit} // Pass the handleCancelEdit function as onCancel prop
                    />
                  ) : (
                    <i
                      className="bi bi-pencil-square"
                      onClick={() => handleEdit(courseFee)}
                    ></i>
                  )}
                </td>
                <td>
                  <i
                    className="bi bi-trash-fill"
                    onClick={() => deleteCourseFeeById(courseFee._id)}
                  ></i>
                </td>
                <td>
                  {!viewMode && (
                    <i
                      className="bi bi-eye-fill"
                      onClick={() => toggleViewMode(courseFee)}
                    ></i>
                  )}

                  {viewMode &&
                    viewCourseFee &&
                    viewCourseFee._id === courseFee._id && (
                      <div>
                        <p>Course Name: {courseFee.courseName}</p>
                        <p>Course ID: {courseFee.courseId}</p>
                        <p>Year: {courseFee.year}</p>
                        <p>Frequency: {courseFee.frequency}</p>
                        <p>Student Category: {courseFee.studentCategory}</p>
                        <p>Total Charges: {courseFee.totalCharges}</p>
                        <p>Term: {courseFee.Term}</p>
                        <p>Start Date: {courseFee.startDate}</p>
                        <p>End Date: {courseFee.endDate}</p>
                        <p>
                          Status: {courseFee.status ? "Active" : "Inactive"}
                        </p>
                        <p>Category: {courseFee.category}</p>
                        <button className="btn btn-primary" onClick={() => toggleViewMode(courseFee)}>
                          Close
                        </button>
                      </div>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseFeesComponent;
