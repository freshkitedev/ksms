import React from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import addstudent from "../img/addstudent.png";
import addfees from "../img/addfees.png";
import payfees from "../img/payfees.png";
import report from "../img/report.png";
import addcourse from "../img/addcourse.jpg";
import updatebank from "../img/bank.jpg";

const DashBoard = () => {
  const navigate = useNavigate();
  const StudentNav = () => {
    navigate("/addstudent");
  };
  const FeeNav = () => {
    navigate("/feeupdate");
  };
  const PayFeeNav = () => {
    navigate("/payfee");
  };
  const ReportNav = () => {
    navigate("/report");
  };
  const AddCourseNav = () => {
    navigate("/coursefee");
  };
  const BankNav = () => {
    navigate("/bank");
  };

  return (
    <div className="container card shadow bg-light"style={{ transform: "scale(0.85)", borderRadius:"50px" }}>

      <h2 className="heading shadow d-flex justify-content-center align-items-center" style={{backgroundColor:"ButtonHighlight", borderRadius:"30px", fontFamily:"cursive"}}><b><i class="bi bi-alexa"></i>&nbsp;Welcome To Ksms</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style={{}}><i class="bi bi-box-arrow-right"></i></span></h2>
      <br></br><br></br>
      <div className="row justify-content-center">
        <div className="col-sm-4 text-center ">
          <button className="button shadow " onClick={StudentNav} >
            <img className="image  card" src={addstudent} alt="add student" />
          </button>
          <p className="para">Add Student&nbsp;<i class="bi bi-people-fill"></i></p>
        </div>
        <div className="col-sm-4 text-center">
          <button className="button shadow" onClick={FeeNav}>
            <img className="image  card" src={addfees} alt="Update Fees" />
          </button>
          <p className="para">Update Fees&nbsp;<i class="bi bi-wallet-fill"></i></p>
        </div>
        <div className="col-sm-4 text-center">
          <button className="button shadow" onClick={AddCourseNav}>
            <img className="image  card" src={addcourse} alt="add course fees" />
          </button>
          <p className="para">Add Course Fees&nbsp;<i class="bi bi-building-fill-add"></i></p>
        </div>
      </div><br></br>
      <div className="row justify-content-center">
        <div className="col-sm-4 text-center">
          <button className="button shadow" onClick={PayFeeNav}>
            <img className="image  card"  src={payfees} alt="pay fees" />
          </button>
          <p className="para">Pay Fees&nbsp;<i class="bi bi-cash-coin"></i></p>
        </div>
        <div className="col-sm-4 text-center">
          <button className="button shadow" onClick={ReportNav}>
            <img className="image  card" src={report} alt="report" />
          </button>
          <p className="para">Report&nbsp;<i class="bi bi-flag-fill"></i></p>
        </div>
        <div className="col-sm-4 text-center">
          <button className="button shadow" onClick={BankNav}>
            <img className="image  card" src={updatebank} alt="Bank Update" />
          </button>
          <p className="para">Bank Update&nbsp;<i class="bi bi-bank"></i></p>
        </div>
      </div>
    </div>
  );
};
export default DashBoard;
