import React, { useState } from "react";

const AddCourseFeeForm = ({ onAdd }) => {
  const [termsInput, setTermsInput] = useState("");
  const [courseFee, setCourseFee] = useState({
    courseName: "",
    courseId: "",
    year: "",
    frequency: "",
    totalCharges: "",
    terms: [],
    startDate: "",
    endDate: "",
    status: false,
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseFee((prevCourseFee) => ({
      ...prevCourseFee,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCourseFee((prevCourseFee) => ({
      ...prevCourseFee,
      [name]: checked,
    }));
  };

  const handleInputChangeterms = (event) => {
    setTermsInput(event.target.value);
  };

  const handleTermsBlur = () => {
    const termsArray = termsInput.split(",").map(Number);
    setCourseFee((prevCourseFee) => ({
      ...prevCourseFee,
      terms: termsArray,
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
  
    const termsTotal = courseFee.terms.reduce((sum, term) => sum + term, 0);
    if (termsTotal !== parseInt(courseFee.totalCharges)) {
      alert("Error: Terms and Total Charges do not match!");
      return;
    }
  
    onAdd(courseFee);
    setCourseFee({
      courseName: "",
      courseId: "",
      year: "",
      frequency: "",
      totalCharges: "",
      terms: [],
      startDate: "",
      endDate: "",
      status: false,
      category: "",
    });
    setTermsInput(""); // Clear the terms input field
  };
  

  return (
    <div className=" d-flex align-items-center justify-content-center vh-70" style={{color:"white"}}>
      <form onSubmit={handleAdd} className="row " >
        <div className="col-md-6">
          <div className="form-group">
            <label>Course Name:</label>
            <input
              type="text"
              className="form-control"
              name="courseName"
              value={courseFee.courseName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Course ID:</label>
            <input
              type="text"
              className="form-control"
              name="courseId"
              value={courseFee.courseId}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Year:</label>
            <input
              type="number"
              className="form-control"
              name="year"
              value={courseFee.year}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Frequency:</label>
            <input
              type="number"
              className="form-control"
              name="frequency"
              value={courseFee.frequency}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Total Charges:</label>
            <input
              type="number"
              className="form-control"
              name="totalCharges"
              value={courseFee.totalCharges}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Terms:</label>
            <input
              type="text"
              className="form-control"
              name="terms"
              value={termsInput}
              onChange={handleInputChangeterms}
              onBlur={handleTermsBlur}
            />
            <small className="text " >
              Enter terms separated by commas (e.g., 1, 2, 3)
            </small>
          </div>
          <div className="form-group">
            <label>Start Date:</label>
            <input
              type="date"
              className="form-control"
              name="startDate"
              value={courseFee.startDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>End Date:</label>
            <input
              type="date"
              className="form-control"
              name="endDate"
              value={courseFee.endDate}
              onChange={handleInputChange}
            />
          </div><br></br>
          <div className="form-group">
            <label>Status: &nbsp;</label>
            <input
              type="checkbox"
              className="form-check-input"
              name="status"
              checked={courseFee.status}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="form-group m-2">
            <label>Category:</label>
            <input
              type="text"
              className="form-control"
              name="category"
              value={courseFee.category}
              onChange={handleInputChange}
            />
          </div>
        </div>&nbsp;
        <div className="col-md-12 d-flex justify-content-center align-items-center">
          <button type="submit" className="btn btn-success" >
            Add Course Fee
          </button>
        </div>
      </form>
    </div>
  );
};


export default AddCourseFeeForm