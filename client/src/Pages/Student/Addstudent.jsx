import React, { useState,useEffect } from "react";
import { useNavigate,useLocation, useParams } from "react-router-dom";

const AddStudentForm = ({ studentData, onAdd, onUpdate,onCancel }) => {
  const location = useLocation();
  const [isUpdating , setIsUpdating] = useState(false)
  const [student, setStudent] = useState({
    Name:{
      firstName: "",
      middleName: "",
      lastName: "",
    },
    rollNumber: "",
    dateOfBirth: "",
    fatherName: "",
    motherName: "",
    homeAddress: "",
    enrollmentDate: "",
    emailID: "",
    mobileNo: "",
    lastDate: "",
    activeIndicator: false,
    userGroup: "",
    grade: "",
    section: "",
    group: "",
    emisNumber: "",
    admissionNo: "",
    category: "",
    academicYear: "",
    concessionApplicable: false,
    vanApplicable: false,
    vanStop: "",
    newStudent: false,
  });


  useEffect(() => {
    if (location.state?.data) {
      setStudent(location.state.data);
      setIsUpdating(true)
    }
  }, [location.state?.data]);
  

  const navigate = useNavigate();
   
  const addstudentpage = ()=>{
        navigate("/addstudent")
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
  
  
    if (name === 'firstName' || name === 'middleName' || name === 'lastName') {
      setStudent((prevStudent) => ({
        ...prevStudent,
        Name: {
          ...prevStudent.Name,
          [name]: newValue,
        },
      }));
    } else {
      setStudent((prevStudent) => ({
        ...prevStudent,
        [name]: newValue,
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isUpdating) {
      // Only call onAdd when you are adding a new student
      onAdd(student);
    } else if (isUpdating) {
      // Handle updating an existing student
      onUpdate(student);
      onCancel(); 
    }
  };

  return (
    <div className="AddStudentForm " style={{color:"black",overflow:"auto"}}><br></br>
     <button className="btn-success p-2 fw-bold" style={{marginLeft:"50px" ,marginBottom:"-10px"}} onClick={addstudentpage}><i class="bi bi-arrow-left-square-fill"></i>Back</button>
      <h3 className="d-flex justify-content-center align-items-center fw-bold" style={{backgroundColor:"ThreeDDarkShadow",color:"whitesmoke" ,height:"70px", borderRadius:"20px", fontFamily:"monospace", marginLeft:"200px",marginRight:"200px",marginTop:"-45px"}} >
       <i className="bi bi-person-add"></i> &nbsp;{isUpdating  ? "Update" : "Add"} Student
      </h3>
      <form onSubmit={handleSubmit} className="row p-4 border border-5 border-info fw-bold "  style={{margin:"50px", backgroundColor:"lightblue"}}>
        <div className="col-md-3">
        <div className="form-group">
          <label>Roll Number:</label>
          <input
            type="text"
            name="rollNumber"
            value={student.rollNumber}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <br></br>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={student.Name.firstName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <br></br>
        <div className="form-group">
          <label>Middle Name:</label>
          <input
            type="text"
            name="middleName"
            value={student.Name.middleName}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <br></br>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={student.Name.lastName}
            onChange={handleChange}
            className="form-control"
           
          />
        </div>
        <br></br>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={student.dateOfBirth}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div></div>
        <br></br>
        <div className="col-md-3">
        <div className="form-group">
          <label>Father's Name:</label>
          <input
            type="text"
            name="fatherName"
            value={student.fatherName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <br></br>
        <div className="form-group">
          <label>Mother's Name:</label>
          <input
            type="text"
            name="motherName"
            value={student.motherName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <br></br>
        <div className="form-group">
          <label>Home Address:</label>
          <input
            type="text"
            name="homeAddress"
            value={student.homeAddress}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <br></br>
        <div className="form-group">
          <label>Enrollment Date:</label>
          <input
            type="date"
            name="enrollmentDate"
            value={student.enrollmentDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <br></br>
        <div className="form-group">
          <label>Email ID:</label>
          <input
            type="email"
            name="emailID"
            value={student.emailID}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div></div>
        <br></br>
        <div className="col-md-3">
        <div className="form-group">
          <label>Mobile Number:</label>
          <input
            type="tel"
            name="mobileNo"
            value={student.mobileNo}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <br></br>
        <div className="form-group">
          <label>Last Date:</label>
          <input
            type="date"
            name="lastDate"
            value={student.lastDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <br></br>
        <div className="form-group">
          <label>Active:</label>
          <input
            type="checkbox"
            name="activeIndicator"
            checked={student.activeIndicator}
            onChange={handleChange}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label>User Group:</label>
          <input
            type="text"
            name="userGroup"
            value={student.userGroup}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <br></br>
        <div className="form-group">
          <label>Grade:</label>
          <input
            type="text"
            name="grade"
            value={student.grade}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <br></br>
        <div className="form-group">
          <label>Section:</label>
          <input
            type="text"
            name="section"
            value={student.section}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div></div>
        <br></br>
        <div className="col-md-3">
        <div className="form-group">
          <label>Group:</label>
          <input
            type="text"
            name="group"
            value={student.group}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <br></br>
        <div className="form-group">
          <label>EMIS Number:</label>
          <input
            type="text"
            name="emisNumber"
            value={student.emisNumber}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <br></br>
        <div className="form-group">
          <label>Admission Number:</label>
          <input
            type="text"
            name="admissionNo"
            value={student.admissionNo}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <br></br>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={student.category}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <br></br>
        <div className="form-group">
          <label>Academic Year:</label>
          <input
            type="text"
            name="academicYear"
            value={student.academicYear}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div><br></br>
        <div className="form-group">
          <label>Concession Applicable:</label>
          <input
            type="checkbox"
            name="concessionApplicable"
            checked={student.concessionApplicable}
            onChange={handleChange}
          />
        </div>
        <br></br>
        <div className="col-md-6">
        <div className="form-group">
          <label>Van Applicable:</label>
          <input
            type="checkbox"
            name="vanApplicable"
            checked={student.vanApplicable}
            onChange={handleChange}
          />
        </div><br></br>
        </div>
        <div className="form-group">
          <label>Van Stop:</label>
          <input
            type="text"
            name="vanStop"
            value={student.vanStop}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div><br></br>
        <div className="form-group">
          <label>New Student:</label>
          <input
            type="checkbox"
            name="newStudent"
            checked={student.newStudent}
            onChange={handleChange}
          />
        </div></div>
        <br></br>
        <div className="col-md-12 d-flex justify-content-center align-items-center">
          <button type="submit" className="btn btn-primary fw-bold btn-lg">
            <i className="bi bi-person-add"></i> &nbsp;{isUpdating ? "Update" : "Add"} Student          
          </button>
          
        </div>
        
      </form>
    </div>
  );
};

export default AddStudentForm;
