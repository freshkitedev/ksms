import React, { useState } from "react";
import "./transaction.css";
// import Header from "./header";
import axios from "axios";

function Transaction() {
  const [totalFees, setTotalFees] = useState({termOne:1000,termTwo: 1000,termThree: 1000,bookFees: 500,vanFees: 700,admissionFees: 100});
  const [paidFees, setPaidFees] = useState({termOne:1000,termTwo: 750,termThree: 0,bookFees: 300,vanFees: 400,admissionFees: 100});
  const [termOne, setTermOne] = useState(1000);
  const [termTwo, setTermTwo] = useState(1000);
  const [termThree, setTermThree] = useState(1000);
  const [bookFees, setBookFees] = useState(500);
  const [vanFees, setVanFees] = useState(750);
  const [admissionFees, setAdmissionFees] = useState(100);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     axios
  //       .get(`http://localhost:5000/api/student/getusers/${id}`)
  //       .then((result) => {
  //         setData(result.data);
  //         console.log("student data", data);
  //       });
  //     console.log("You clicked submit.", data);
  //   };
  return (
    <>
    <div className="sandy">
      <div className="trans">
          <form>
            <label className="search-lab" style={{marginRight:48}}>Student Id</label>
            <input className="search-inp" placeholder="Enter roll number " />
            <label className="search-lab">Student Name</label>
            <input className="search-inp" placeholder="Enter student name " />
          </form>
        <button className="button">Submit</button>
      </div>
      <div className="trans-tab">
        <table className="tot-fee">
          <thead>
            <tr>
              <th className="tot-fee-tr">Fees Type</th>
            </tr>
          </thead>
          <tbody>
                <tr>
                  <td className="tot-fee-tr">Term 1</td>
                </tr>
                <tr>
                  <td className="tot-fee-tr">Term 2</td>
                </tr>
                <tr>
                  <td className="tot-fee-tr">Term 3</td>
                </tr>
                <tr>
                  <td className="tot-fee-tr">Book Fees</td>
                </tr>
                <tr>
                  <td className="tot-fee-tr">Van Fees</td>
                </tr>
                <tr>
                  <td className="tot-fee-tr">Admmision Fees</td>
                </tr>
          </tbody>
        </table>
        <table className="tot-fee">
          <thead>
            <tr>
              <th className="tot-fee-tr">Total Amount</th>
            </tr>
          </thead>
          <tbody>
                <tr><td className="tot-fee-tr">{totalFees.termOne}</td></tr>
                <tr><td className="tot-fee-tr">{totalFees.termTwo}</td></tr>
                <tr><td className="tot-fee-tr">{totalFees.termThree}</td></tr>
                <tr><td className="tot-fee-tr">{totalFees.bookFees}</td></tr>
                <tr><td className="tot-fee-tr">{totalFees.vanFees}</td></tr>
                <tr><td className="tot-fee-tr">{totalFees.admissionFees}</td></tr>
          </tbody>
        </table>
        <table className="tot-fee">
          <thead>
          <tr>
            <th className="tot-fee-tr">Paid Amount</th>
          </tr>
          </thead>
          <tbody>
                <tr><td className="tot-fee-tr">{paidFees.termOne}</td></tr>
                <tr><td className="tot-fee-tr">{paidFees.termTwo}</td></tr>
                <tr><td className="tot-fee-tr">{paidFees.termThree}</td></tr>
                <tr><td className="tot-fee-tr">{paidFees.bookFees}</td></tr>
                <tr><td className="tot-fee-tr">{paidFees.vanFees}</td></tr>
                <tr><td className="tot-fee-tr">{paidFees.admissionFees}</td></tr>
          </tbody>         
        </table>
      </div>
      <div className="billing">
      <div className="bill-div"><label className="bill-inp">Amount</label></div>
        <div className="bill-div"><label className="bill-inp">{termOne}</label></div>
        <div className="bill-div"><label className="bill-inp">{termTwo}</label></div>
        <div className="bill-div"><label className="bill-inp">{termThree}</label></div>
        <div className="bill-div" ><input className="bill-inp" name="bookFees" value={bookFees}/></div>
        <div className="bill-div"><input className="bill-inp" name="vanFees" value={vanFees}/></div>
        <div className="bill-div"><input className="bill-inp" name="admissionFees" value={admissionFees}/></div>
      </div>
      </div>
      
      <button className="submitButton">Sumbit</button>
    </>
  );
}

export default Transaction;
