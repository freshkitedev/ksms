import React, { useState } from "react";
import "./transaction.css";
// import Header from "./header";
import axios from "axios";

function Transaction() {
  const [totalFees, setTotalFees] = useState({
    termOne: 1000,
    termTwo: 1000,
    termThree: 1000,
    bookFees: 500,
    vanFees: 700,
    admissionFees: 100,
  });
  const [lyTotalFees, setLyTotalFees] = useState({
    termOne: 800,
    termTwo: 800,
    termThree: 800,
    bookFees: 300,
    vanFees: 450,
    admissionFees: 50,
  });
  const [paidFees, setPaidFees] = useState({
    termOne: 1000,
    termTwo: 750,
    termThree: 0,
    bookFees: 300,
    vanFees: 400,
    admissionFees: 100,
  });
  const [pastFees, setPastFees] = useState({
    termOne: 0,
    termTwo: 0,
    termThree: 0,
    bookFees: 0,
    vanFees: 400,
    admissionFees: 0,
  });
  // const [termOne, setTermOne] = useState(1000);
  // const [termTwo, setTermTwo] = useState(1000);
  // const [termThree, setTermThree] = useState(1000);
  // const [bookFees, setBookFees] = useState(500);
  // const [vanFees, setVanFees] = useState(750);
  // const [admissionFees, setAdmissionFees] = useState(100);
  // const [totalAmount, setTotalAmount] = useState(100);
  // const [termFees, setTermFees] = useState(100);

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   axios
    //     .get(`http://localhost:5000/api/student/getstudent/${id}`)
    //     .then((result) => {
    //       setData(result.data);
    //       console.log("student data", data);
    //     });
    //   console.log("You clicked submit.", data);
    // };
  return (
    <>
      <div className="sandy">
        <div className="trans">
          <form>
            <label className="search-lab" style={{ marginRight: 48 }}>
              Student Id
            </label>
            <input className="search-inp" placeholder="Enter roll number " />
            <label className="search-lab">Student Name</label>
            <input className="search-inp" placeholder="Enter student name " />
          </form>
          <button className="button">Submit</button>
        </div>
        <div className="trans-tab">
          <table className="tot-fee">
            <thead>
              
            </thead>
            <tbody>
              <tr>
                <td className="tot-fee-tr"></td>
                <td className="tot-fee-tr">Term 1</td>
                <td className="tot-fee-tr">Term 2</td>
                <td className="tot-fee-tr">Term 3</td>
                <td className="tot-fee-tr">Book Fees</td>
                <td className="tot-fee-tr">Van Fees</td>
                <td className="tot-fee-tr">Admmision Fees</td>
              </tr>
            </tbody>
          </table>
          <table className="tot-fee">
            <thead>
            
            </thead>
            <tbody>
              <tr>
              <td className="tot-fee-tr">Total Fees 
              <span style={{"fontSize":11}}> (current year)</span>
              </td>
                <td className="tot-fee-tr">{totalFees.termOne}</td>
                <td className="tot-fee-tr">{totalFees.termTwo}</td>
                <td className="tot-fee-tr">{totalFees.termThree}</td>
                <td className="tot-fee-tr">{totalFees.bookFees}</td>
                <td className="tot-fee-tr">{totalFees.vanFees}</td>
                <td className="tot-fee-tr">{totalFees.admissionFees}</td>
              </tr>
            </tbody>
          </table>
          <table className="tot-fee">
            <thead>
              
            </thead>
            <tbody>
              <tr>
                <td className="tot-fee-tr">Paid Fees</td>
                <td className="tot-fee-tr">{paidFees.termOne}</td>
                <td className="tot-fee-tr">{paidFees.termTwo}</td>
                <td className="tot-fee-tr">{paidFees.termThree}</td>
                <td className="tot-fee-tr">{paidFees.bookFees}</td>
                <td className="tot-fee-tr">{paidFees.vanFees}</td>
                <td className="tot-fee-tr">{paidFees.admissionFees}</td>
              </tr>
            </tbody>
          </table>
          <div className="last-year-fees">
          <table className="tot-fee">
            <thead>
            
            </thead>
            <tbody>
              <tr>
              <td className="tot-fee-tr">Total Fees 
              <span style={{"fontSize":11}}> (Last year)</span>
              </td>
                <td className="tot-fee-tr">{lyTotalFees.termOne}</td>
                <td className="tot-fee-tr">{lyTotalFees.termTwo}</td>
                <td className="tot-fee-tr">{lyTotalFees.termThree}</td>
                <td className="tot-fee-tr">{lyTotalFees.bookFees}</td>
                <td className="tot-fee-tr">{lyTotalFees.vanFees}</td>
                <td className="tot-fee-tr">{lyTotalFees.admissionFees}</td>
              </tr>
            </tbody>
          </table>
          <table className="tot-fee">
            <thead>
              
            </thead>
            <tbody>
              <tr>
                <td className="tot-fee-tr">Paid Fees</td>
                <td className="tot-fee-tr">{pastFees.termOne}</td>
                <td className="tot-fee-tr">{pastFees.termTwo}</td>
                <td className="tot-fee-tr">{pastFees.termThree}</td>
                <td className="tot-fee-tr">{pastFees.bookFees}</td>
                <td className="tot-fee-tr">{pastFees.vanFees}</td>
                <td className="tot-fee-tr">{pastFees.admissionFees}</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </div>
      
    </>
  );
}

export default Transaction;
