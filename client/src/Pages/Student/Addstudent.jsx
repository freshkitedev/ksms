import React, { useState } from "react";

const AddStudentForm = ({ onAdd }) => {
  const [student, setStudent] = useState({
    rollNumber: "",
    fname: "",
    mname: "",
    lname: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(student);

    setStudent({
      rollNumber: "",
      fname: "",
      mname: "",
      lname: "",
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
  };

  return (
    <div className="AddStudentForm " style={{color:"white"}}><br></br>
      <h3 className="d-flex justify-content-center align-items-center" style={{backgroundColor:"ThreeDDarkShadow" ,height:"70px", borderRadius:"20px", fontFamily:"monospace", marginLeft:"40px"}} ><i class="bi bi-person-add"></i> &nbsp;Add New Student : </h3>
      <form onSubmit={handleSubmit} className="row">
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
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="fname"
            value={student.fname}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Middle Name:</label>
          <input
            type="text"
            name="mname"
            value={student.mname}
            onChange={handleChange}
            className="form-control"
    
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lname"
            value={student.lname}
            onChange={handleChange}
            className="form-control"
           
          />
        </div>
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
        <div className="form-group">
          <label>Active:</label>
          <input
            type="checkbox"
            name="activeIndicator"
            checked={student.activeIndicator}
            onChange={handleCheckboxChange}
          />
        </div>
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
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="col-md-6">
        <div className="form-group">
          <label>Van Applicable:</label>
          <input
            type="checkbox"
            name="vanApplicable"
            checked={student.vanApplicable}
            onChange={handleCheckboxChange}
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
            onChange={handleCheckboxChange}
          />
        </div></div>
        <div className="col-md-12 d-flex justify-content-center align-items-center">
        <button type="submit" className="btn btn-primary">
        <i class="bi bi-person-add"></i>&nbsp; Click Here to Add!!!
        </button></div>
      </form>
    </div>
  );
};

export default AddStudentForm;
