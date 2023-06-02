import React from "react";
import "./Dashboard.css"
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
        navigate("/student")
    }
    const FeeNav = () => {
        navigate("/feesupdate")
    }
    const PayFeeNav = () => {
        navigate("/payfee")
    }
    const ReportNav = () => {
        navigate("/report")
    }
    const AddCourseNav = () => {
        navigate("/addcourse")
    }
    const BankNav = () => {
        navigate("/bank")
    }

    return (

        <div class="row">
            <div class="col-sm-4">
                <button  className="button" onClick={StudentNav}>
                    <img className="image" src={addstudent} alt="add student" />
                </button>
                <p className="para"> Add Student </p>
            </div>
            <div class="col-sm-4">
                <button   className="button" onClick={FeeNav}>
                    <img className="image" src={addfees} alt="Update Fees" />
                </button>
                <p className="para"> Update Fees </p>
            </div>
            <div class="col-sm-4">
                <button   className="button" onClick={AddCourseNav}>
                    <img className="image" src={addcourse} alt="add course" />
                </button>
                <p className="para"> Add Course </p>
            </div>
            <div class="col-sm-4">
                <button  className="button" onClick={PayFeeNav}>
                    <img className="image" src={payfees} alt="pay fees" />
                </button>
                <p className="para"> Pay Fees </p>
            </div>
            <div class="col-sm-4">
                <button   className="button" onClick={ReportNav}>
                    <img className="image" src={report} alt="report" />
                </button>
                <p className="para"> Report </p>
            </div>
            <div class="col-sm-4">
                <button  className="button" onClick={BankNav}>
                    <img className="image" src={updatebank} alt="Bank Update" />
                </button>
                <p className="para"> Bank Update </p>
            </div>
        </div>

    )
}
export default DashBoard;