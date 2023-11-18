import React, { useState } from "react";
import "../Coursefees/Coursefee.css";


const AddCourseFeeForm = ({ onAdd }) => {
  const [termsInput, setTermsInput] = useState("");
  const [courseFee, setCourseFee] = useState({
    courseName: "",
    year: "",
    BookFees: "",
    rteFees: "",
    totalCharges: "",
    term: [],
  });
  const [errorName, setErrorName] = useState("");
  const [errorYear, setErrorYear] = useState("");
     
  const courseNames = [
    "Pre KG",
    "LKG",
    "UKG",
    "class 1",
    "class 2",
    "class 3",
    "class 4",
    "class 5",
    "class 6",
    "class 7",
    "class 8",
    "class 9",
    "class 10",
    "class 11",
    "class 12",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseFee((prevCourseFee) => ({
      ...prevCourseFee,
      [name]: value,
    }));

    if (name === "studentCategory" && value !== "RTE") {
      setCourseFee((prevCourseFee) => ({
        ...prevCourseFee,
        rteFees: "",
      }));
    }
  };

  const validateName = () => {
    const regex = /^[A-Za-z 0-9\s]+$/;
    if (!regex.test(courseFee.courseName.trim())) {
      setErrorName("Invalid course name");
    } else {
      setErrorName("");
    }
  };

  const validateYear = () => {
    const regex = /^[0-4]+$/;
    if (!regex.test(courseFee.year.trim())) {
      setErrorYear("Invalid year format");
    } else {
      setErrorYear("");
    }
  };

  const handleInputChangeterms = (event) => {
    setTermsInput(event.target.value);
  };

  const handleTermsBlur = () => {
    const termsArray = termsInput.split(",").map(Number);
    setCourseFee((prevCourseFee) => ({
      ...prevCourseFee,
      term: termsArray,
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const termsTotal = courseFee.term.reduce((sum, term) => sum + term, 0);
    if (termsTotal !== parseInt(courseFee.totalCharges)) {
      alert("Error: Terms and Total Charges do not match!");
      return;
    }

    if (errorName || errorYear) {
      alert("Error: Please fix the validation errors.");
      return;
    }

    onAdd(courseFee);
    setCourseFee({
      courseName: "",
      year: "",
      BookFees: "",
      rteFees: "",
      totalCharges: "",
      term: [],
    });
    setTermsInput("");
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-70">
      <form
        onSubmit={handleAdd}
        className="row p-4 border border-5 border-info fw-bold"
        style={{ margin: "50px", backgroundColor: "lightblue" }}
      >
      <div class="dropdown">

  <div class="dropdown-content">
  </div> 
  </div>
 
        <div className="col-md-6">
          <div className="form-group">
            <label>Course Name:</label>

            <select
              className="form-control"
              name="courseName"
              value={courseFee.courseName}
              onChange={handleInputChange}
              onBlur={validateName}
            >
              <option value="">Select Course name</option>
              {courseNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
                
 
              ))}
            </select>
            {errorName && <div style={{ color: "red" }}>{errorName}</div>}
          </div>

          <div className="form-group">
            <label>Year:</label>
            <input
              type="text"
              className="form-control"
              name="year"
              value={courseFee.year}
              onChange={handleInputChange}
              onBlur={validateYear}
            />
            {errorYear && <div style={{ color: "red" }}>{errorYear}</div>}
          </div>

          <div className="form-group">
            <label>Book Fees:</label>
            <input
              type="number"
              className="form-control"
              name="BookFees"
              value={courseFee.BookFees}
              onChange={handleInputChange}
            />
          </div>
      


        
          <div className="form-group">
            <label>Rte Fees:</label>
            <input
              type="number"
              className="form-control"
              name="rteFees"
              value={courseFee.rteFees}
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
            <label>Term Fees:</label>
            <input
              type="text"
              className="form-control"
              name="term"
              value={termsInput}
              onChange={handleInputChangeterms}
              onBlur={handleTermsBlur}
            />
            <small className="text " >
              Enter terms separated by commas (e.g., 1, 2, 3)
            </small>
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


export default AddCourseFeeForm;
