import React, { useEffect, useState } from "react";
import {useNavigate}from "react-router-dom"
import axios from "axios";
import FullScreenStudentDetails from './FullScreenStudentDetails';
import './StudentForm.css';
import AddStudentForm from './Addstudent'; 
import ExcelUpload from "./ExcelUpload";
import { Button, Modal, Table, Row, Col, Tabs, Tab } from "react-bootstrap";

const StudentsComponent = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

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
  const handleAddStudent = async (student) => {
    console.log("Adding new student:", student);
    try {
      await axios.post("http://localhost:5000/api/student/createstudent", student);
      console.log("changing")
      alert("Student created successfully");
      console.log("successfully Added",student)
      getAllStudents();
    } catch (error) {
      console.error("Failed to create student:", error);
    }
  };
  // you can  also search using  roll number

  // const handleSearch = () => {   
  //   if (searchTerm) {
  //     const foundStudent = students.find((s) => s.rollNumber == searchTerm) 
  //     console.log(students)
  //     if (foundStudent) {
  //       setSelectedStudent(foundStudent);
  //       setShowModal(true);
  //       console.log("Student Found")
  //     } else {
  //       console.log("student not found")
  //       setShowModal(true);
  //     }
  //   }
  // };
  // you can search the student details using name 
  const handleSearch = () => {   
    if (searchTerm) {
      const foundStudent = students.find((s) => 
        s && s.Name.firstName && s.Name.firstName.toLowerCase() === searchTerm.toLowerCase()
      );
  
      if (foundStudent) {
        setSelectedStudent(foundStudent);
        setShowModal(true);
        console.log("Student Found");
        console.log("Found Student:", foundStudent);
        console.log("First Name:", foundStudent.Name.firstName);
      } else {
        console.log("Student not found");
        setShowModal(true);
      }
    }
  };

  const closeLightbox = () => {
    setSelectedStudent(null);
    setShowModal(false);
    console.log("closing light Box")
  };

  const handleUpdateStudent = async (updatedStudentData) => {
    try {
      await axios.put(`/api/student/update/${updatedStudentData._id}`, updatedStudentData);
      console.log("Student details updated successfully");
      getAllStudents();
    } catch (error) {
      console.error("An error occurred:", error);
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
      console.log(allStudents)
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
       <button className="btn-success p-2 fw-bold mt-4" style={{marginLeft:"50px" ,marginBottom:"-10px"}} onClick={dashboard}><i className="bi bi-arrow-left-square-fill"></i>Back</button>
      <h2 style={{ textAlign: "center", fontFamily: "fantasy", color: "black"}}>
      <i className="bi bi-person-circle"></i>&nbsp;Student Details
      </h2>
      <div className="d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column align-items-center">
        <br />
          <button className="btn btn-info mb-3" onClick={toggleForm} >
            {showForm ? <i className="bi bi-eye-slash"></i> : "Add New Student"}
          </button>
        </div>
        {showForm && (
          <AddStudentForm
            onAdd={handleAddStudent}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
      <div className="d-flex justify-content-center align-items-center"> 
        <div className="input-group d-flex justify-content-center align-items-center">
          <input
            type="text"
            className="form-control-sm"
            placeholder="Enter your First Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-info"
              type="button"
              onClick={handleSearch}
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {selectedStudent ? (
              <FullScreenStudentDetails
                student={selectedStudent}
                onClose={closeLightbox}
                
              />
            ) : (
             <div className="student-not-found-popup">
                <p>Student Not Found</p>
                <button className="btn btn-danger" onClick={closeLightbox}>Close</button>
              </div> 
            )}
          </div>
        </div>
      )}
      <br />
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
