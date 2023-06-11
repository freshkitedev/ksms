import React, { useEffect, useState } from "react";
import axios from "axios";

import EditStudentForm from "./EditComponent";
import AddStudentForm from "./Addstudent";
import ExcelUpload from "./ExcelUpload";

const StudentsComponent = () => {
  const [students, setStudents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
    setViewMode(false);
    setViewStudent(null);
  };

  const toggleViewMode = (student) => {
    if (viewMode) {
      setViewMode(false);
      setViewStudent(null);
    } else {
      setViewMode(true);
      setViewStudent(student);
    }
  };

  const handleEdit = (student) => {
    setEditStudent(student);
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditStudent(null);
  };

  const handleUpdate = () => {
    setEditMode(false);
    setEditStudent(null);
    getAllStudents();
  };

  const handleAddStudent = async (student) => {
    try {
      await axios.post("http://localhost:5000/api/student/createstudent", student);
      // Handle success or perform any necessary actions
      alert("Student created successfully");
      console.log("successfully Added")
      getAllStudents();
    } catch (error) {
      // Handle error
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

      getAllStudents();
    } catch (error) {
      console.error("Failed to upload Excel data:", error);
    }
  };

  const getAllStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/student/getstudent");
      const allStudents = response.data;
      setStudents(allStudents);
    } catch (error) {
      // Handle error
    }
  };

  const deleteStudentById = async (studentId) => {
    try {
      alert("Are you sure you want to delete the student?");
      await axios.delete(`http://localhost:5000/api/student/delete/${studentId}`);
      // Handle success or perform any necessary actions
      console.log("Student deleted successfully");

      getAllStudents();
    } catch (error) {
      // Handle error
      console.error("Failed to delete student:", error);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <div className="Student">
      <h2 style={{ textAlign: "center", fontFamily: "fantasy", color: "white" }}>
      <i class="bi bi-person-circle"></i>&nbsp;Student Details
      </h2>
      <div className="d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column align-items-center">
          {showForm && <AddStudentForm onAdd={handleAddStudent} />}
          <br />
          <button className="btn btn-info mb-3" onClick={toggleForm}>
            {showForm ? "Hide Student Form" : "Add New Student"}
          </button>
        </div>
      </div>

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
            <ExcelUpload onUpload={handleExcelUpload} />
            <button
              className="btn btn-secondary mt-3"
              onClick={() => setShowUploadForm(false)}
            >
              Hide Upload Form
            </button>
          </div>
        )}
      </div>

      <div className="table-container p-5" style={{ transform: "scale(0.9)" }}>
        <table className="table table-primary" style={{ fontFamily: "cursive" }}>
          <thead className="text-primary">
            <tr>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Date of Birth</th>
             
              <th>Home Address</th>
              <th>Enrollment Date</th>
              <th>Email ID</th>
              <th>Mobile Number</th>
              <th>Last Date</th>
              <th>Active Indicator</th>
              <th>User Group</th>
              <th>Grade</th>
              <th>Section</th>
              <th>Group</th>
              <th>EMIS Number</th>
        
              <th>Category</th>
              <th>Academic Year</th>
              <th>Concession Applicable</th>
              <th>Van Applicable</th>
              <th>Van Stop</th>
              <th>New Student</th>
              <th>Update</th>
              <th>Delete</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.rollNumber}</td>
                <td>{`${student.Name.fName} ${student.Name.mName} ${student.Name.lName}`}</td>
                <td>{student.dateOfBirth}</td>
                <td>{student.homeAddress}</td>
                <td>{student.enrollmentDate}</td>
                <td>{student.emailID}</td>
                <td>{student.mobileNo}</td>
                <td>{student.lastDate}</td>
                <td>{student.activeIndicator ? "Active" : "Inactive"}</td>
                <td>{student.userGroup}</td>
                <td>{student.grade}</td>
                <td>{student.section}</td>
                <td>{student.group}</td>
                <td>{student.emisNumber}</td>
                <td>{student.category}</td>
                <td>{student.academicYear}</td>
                <td>{student.concessionApplicable ? "Yes" : "No"}</td>
                <td>{student.vanApplicable ? "Yes" : "No"}</td>
                <td>{student.vanStop}</td>
                <td>{student.newStudent ? "Yes" : "No"}</td>
                <td>
                  {editMode &&
                  editStudent &&
                  editStudent._id === student._id ? (
                    <EditStudentForm
                      student={editStudent}
                      onUpdate={handleUpdate}
                      onCancel={handleCancelEdit}
                    />
                  ) : (
                    <i
                      className="bi bi-pencil-square"
                      onClick={() => handleEdit(student)}
                    ></i>
                  )}
                </td>
                <td>
                  <i
                    className="bi bi-trash-fill"
                    onClick={() => deleteStudentById(student._id)}
                  ></i>
                </td>
                <td>
                  {!viewMode && (
                    <i
                      className="bi bi-eye-fill"
                      onClick={() => toggleViewMode(student)}
                    ></i>
                  )}

                  {viewMode && viewStudent && viewStudent._id === student._id && (
                    <div>
                      <p>Roll Number: {student.rollNumber}</p>
                      <p>Name: {`${student.Name.fName} ${student.Name.mName} ${student.Name.lName}`}</p>
                      <p>Date of Birth: {student.dateOfBirth}</p>
                      <p>Father's Name: {student.fatherName}</p>
                      <p>Mother's Name: {student.motherName}</p>
                      <p>Home Address: {student.homeAddress}</p>
                      <p>Enrollment Date: {student.enrollmentDate}</p>
                      <p>Email ID: {student.emailID}</p>
                      <p>Mobile Number: {student.mobileNo}</p>
                      <p>Last Date: {student.lastDate}</p>
                      <p>
                        Active Indicator:{" "}
                        {student.activeIndicator ? "Active" : "Inactive"}
                      </p>
                      <p>User Group: {student.userGroup}</p>
                      <p>Grade: {student.grade}</p>
                      <p>Section: {student.section}</p>
                      <p>Group: {student.group}</p>
                      <p>EMIS Number: {student.emisNumber}</p>
                      <p>Admission Number: {student.admissionNo}</p>
                      <p>Category: {student.category}</p>
                      <p>Academic Year: {student.academicYear}</p>
                      <p>
                        Concession Applicable:{" "}
                        {student.concessionApplicable ? "Yes" : "No"}
                      </p>
                      <p>Van Applicable: {student.vanApplicable ? "Yes" : "No"}</p>
                      <p>Van Stop: {student.vanStop}</p>
                      <p>New Student: {student.newStudent ? "Yes" : "No"}</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => toggleViewMode(student)}
                      >
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

export default StudentsComponent;
