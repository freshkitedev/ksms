import React, { useEffect, useState } from "react";
import {useNavigate}from "react-router-dom"
import axios from "axios";

import EditStudentForm from "./EditComponent";
import AddStudentForm from "./Addstudent";
import ExcelUpload from "./ExcelUpload";
import { Button, Modal, Table, Row, Col, Tabs, Tab } from "react-bootstrap";

const StudentsComponent = () => {
  const [students, setStudents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const navigate = useNavigate();
  const dashboard = () =>{
          navigate("/dashboard")
  }

  const toggleForm = () => {
    setShowForm(!showForm);
    setViewMode(false);
    setViewStudent(null);
    navigate("/studentform")
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
       <button className="btn-success p-2 fw-bold mt-4" style={{marginLeft:"50px" ,marginBottom:"-10px"}} onClick={dashboard}><i class="bi bi-arrow-left-square-fill"></i>Back</button>
      <h2 style={{ textAlign: "center", fontFamily: "fantasy", color: "black"}}>
      <i class="bi bi-person-circle"></i>&nbsp;Student Details
      </h2>
      <div className="d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column align-items-center">
          {showForm && <AddStudentForm onAdd={handleAddStudent} />}
          <br />
          <button className="btn btn-info mb-3" onClick={toggleForm} >
            {showForm ? <i class="bi bi-eye-slash"></i> : "Add New Student"}
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

      
    </div>
  );
};

export default StudentsComponent;
