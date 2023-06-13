import React, { useState } from "react";
import "./transaction.css";
import { Button, Modal } from "react-bootstrap";
// import Header from "./header";
import axios from "axios";

function Transaction() {

  const [data, setData] = useState();

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
  const [installedTools, setInstalledTools] = useState([
    {
      roll_no: 1,
      name: "siva",
      standard: 10,
      fatherName: "raja",
      motherName: "amudha",
      address: "ssss",
    },
    {
      roll_no: 2,
      name: "siva",
      standard: 10,
      fatherName: "aaaa",
      motherName: "bbb",
      address: "kkk",
    },
  ]);

  const [showModal, setShowModal] = useState(true);
  const [pastFees, setPastFees] = useState({
    termOne: 0,
    termTwo: 0,
    termThree: 0,
    bookFees: 0,
    vanFees: 400,
    admissionFees: 0,
  });

  const handleModal = () => {
    setShowModal(false);
  };

  const installedToolsTable = () => {
    if (installedTools?.length > 0) {
      return installedTools?.map((tools, index) => {
        const { roll_no, name, standard, fatherName, motherName, address } =
          tools;
        return (
          <tr key={index}>
            <td>{roll_no}</td>
            <td>{name}</td>
            <td>{standard}</td>
            <td>{fatherName}</td>
            <td>{motherName}</td>
            <td>{address}</td>
            <td>Ok</td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td>No data to display..!</td>
        </tr>
      );
    }
  };
  // const [termOne, setTermOne] = useState(1000);
  // const [termTwo, setTermTwo] = useState(1000);
  // const [termThree, setTermThree] = useState(1000);
  // const [bookFees, setBookFees] = useState(500);
  // const [vanFees, setVanFees] = useState(750);
  // const [admissionFees, setAdmissionFees] = useState(100);
  // const [totalAmount, setTotalAmount] = useState(100);
  // const [termFees, setTermFees] = useState(100);

  const handleSubmit = (e) => {
    console.log("first",data);
    e.preventDefault();
    axios
      .get(`http://localhost:5000/api/student/getusers/`)
      .then((result) => {
        setData(result.data);
        console.log("student data", data);
      });
    console.log("You clicked submit.", data);
  };
  const [selectedYear, setSelectedYear] = useState("");
  const currentYear = new Date().getFullYear();
  const startYear = 2010;
  const endYear = currentYear + 10;
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  
  // const test = () => {


  //   return(
  //   <Modal
  //       show={showModal}
  //       onHide={() => handleModal()}
  //       dialogClassName="modal-lg"
  //     >
  //       <Modal.Header closeButton>
  //         <h4>Student Details</h4>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <div className="market-table">
  //           <div className="table-responsive">
  //             <table className="table mb-0">
  //               <thead>
  //                 <tr>
  //                   <th>Roll No</th>
  //                   <th>Name</th>
  //                   <th>Standard</th>
  //                   <th>Father Name</th>
  //                   <th>Mother Name</th>
  //                   <th>Address</th>
  //                   <th>Action</th>
  //                 </tr>
  //               </thead>
  //               <tbody>{installedToolsTable()}</tbody>
  //             </table>
  //           </div>
  //         </div>
  //       </Modal.Body>
  //     </Modal>
  //   )
  // }

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => handleModal()}
        dialogClassName="modal-lg"
      >
        <Modal.Header closeButton>
          <h4>Student Details</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="market-table">
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th>Roll No</th>
                    <th>Name</th>
                    <th>Standard</th>
                    <th>Father Name</th>
                    <th>Mother Name</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{installedToolsTable()}</tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="trans">
        <div>
          <form className="search-form">
            <label className="search-lab" style={{ marginLeft: 100 }}>
              Student Id
            </label>
            <input className="search-inp" placeholder="Enter roll number " />
            <label className="search-lab">Student Name</label>
            <input className="search-inp" placeholder="Enter student name " />
            <button className="button" >Submit</button>
          </form>
        </div>

        <div className="sandy">
          <div className="fees-details">
            <form>
              <label className="details-lab">Year</label>
              <select
                className="details-inp"
                value={selectedYear}
                onChange={handleYearChange}
              >
                <option value="">Select Year</option>
                {Array.from({ length: endYear - startYear + 1 }, (_, index) => (
                  <option key={startYear + index} value={startYear + index}>
                    {startYear + index}
                  </option>
                ))}
              </select>
              <label className="details-lab">Term Fees</label>
              <input className="details-inp" />
              <label className="details-lab">Book Fees</label>
              <input className="details-inp" />
              <label className="details-lab">Van Fees</label>
              <input className="details-inp" />
              <label className="details-lab">Admission Fees</label>
              <input className="details-inp" />
              <label className="details-lab">Total</label>
              <input className="details-inp" />
            </form>
            <button className="submit-btn">Submit</button>
          </div>
          <div className="trans-tab">
            <table className="tot-fee">
              <thead></thead>
              <tbody>
                <tr style={{height: 68.5}}><td className="tot-fee-tr">Fees Type</td></tr>
                <tr><td className="tot-fee-tr">Term 1</td></tr>
                <tr><td className="tot-fee-tr">Term 2</td></tr>
                <tr><td className="tot-fee-tr">Term 3</td></tr>
                <tr><td className="tot-fee-tr">Van Fees</td></tr>
                <tr><td className="tot-fee-tr">AdmissionFees</td></tr>
              </tbody>
            </table>
            <table className="tot-fee">
              <thead></thead>
              <tbody>
                <tr style={{height: 50}}>
                  <td className="tot-fee-tr">
                    Total Fees 
                    <br></br>
                    <span style={{ fontSize: 11 }}>(current year)</span>
                  </td>
                </tr>
                <tr><td className="tot-fee-tr">{totalFees.termOne}</td></tr>
                <tr><td className="tot-fee-tr">{totalFees.termTwo}</td></tr>
                <tr><td className="tot-fee-tr">{totalFees.termThree}</td></tr>
                <tr><td className="tot-fee-tr">{totalFees.vanFees}</td></tr>
                <tr><td className="tot-fee-tr">{totalFees.admissionFees}</td></tr>
              </tbody>
            </table>
            <table className="tot-fee">
              <thead></thead>
              <tbody>
                <tr style={{height: 50}}><td className="tot-fee-tr">Paid Fees
                <br></br>
                <span style={{ fontSize: 11 }}> (current year)</span></td></tr>
                <tr><td className="tot-fee-tr">{paidFees.termOne}</td></tr>
                <tr><td className="tot-fee-tr">{paidFees.termTwo}</td></tr>
                <tr><td className="tot-fee-tr">{paidFees.termThree}</td></tr>
                <tr><td className="tot-fee-tr">{paidFees.vanFees}</td></tr>
                <tr><td className="tot-fee-tr">{paidFees.admissionFees}</td></tr>
              </tbody>
            </table>
            <div className="last-year-fees">
              <table className="tot-fee">
                <thead></thead>
                <tbody>
                  <tr>
                    <td className="tot-fee-tr">
                      Total Fees
                      <br></br>
                      <span style={{ fontSize: 11 }}> (Past year)</span>
                    </td>
                  </tr>
                  <tr><td className="tot-fee-tr">{lyTotalFees.termOne}</td></tr>
                  <tr><td className="tot-fee-tr">{lyTotalFees.termTwo}</td></tr>
                  <tr><td className="tot-fee-tr">{lyTotalFees.termThree}</td></tr>
                  <tr><td className="tot-fee-tr">{lyTotalFees.vanFees}</td></tr>
                  <tr><td className="tot-fee-tr">{lyTotalFees.admissionFees}</td></tr>
                </tbody>
              </table>
              <table className="tot-fee">
                <thead></thead>
                <tbody>
                  <tr style={{height: 50}}><td className="tot-fee-tr">Paid Fees
                  <br></br>
                  <span style={{ fontSize: 11 }}> (Past year)</span></td></tr>
                  <tr><td className="tot-fee-tr">{pastFees.termOne}</td></tr>
                  <tr><td className="tot-fee-tr">{pastFees.termTwo}</td></tr>
                  <tr><td className="tot-fee-tr">{pastFees.termThree}</td></tr>
                  <tr><td className="tot-fee-tr">{pastFees.vanFees}</td></tr>
                  <tr><td className="tot-fee-tr">{pastFees.admissionFees}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Transaction;
