import React, { useState } from "react";
import "./transaction.css";
import { Button, Modal, Table } from "react-bootstrap";
import axios from "axios";

function Transaction() {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentdata, setStudentData] = useState("");
  const [students, setStudents] = useState([]);
  const [feeDetails, setFeeDetails] = useState([]);
  
  const handleStudentIdChange = (event) => {
    setStudentId(event.target.value);
  };

  const handleStudentNameChange = (event) => {
    setStudentName(event.target.value);
  };

  const handleStudentIdSubmit = () => {
    if (studentId) {
      // Call backend API to get student by ID
      axios
        .get(`http://localhost:5000/api/student/getusers/${studentId}`)
        .then((response) => {
          setStudentData(response.data.details);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleStudentNameSubmit = () => {
    if (studentName) {
      // Call backend API to get student by Name
      axios
        .get(`http://localhost:5000/api/student/getusers/name/${studentName}`)
        .then((response) => {
          setStudents(response.data.details);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleSelectStudent = (studentId) => {
    // Call backend API to get student fee details by ID
    axios
      .get(`http://localhost:5000/api/student/getusers/${studentId}`)
      .then((response) => {
        // Display fee details in a table or perform any other action
        console.log(response.data);
        setFeeDetails(response.data.details.fees);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Student ID"
        value={studentId}
        onChange={handleStudentIdChange}
      />
      <Button onClick={handleStudentIdSubmit}>Get Student by ID</Button>
      {/* Display fee details in a table */}
      {studentdata && (
        <Table>
          <thead>
            <tr>
              <th className="table-cell">Total Charges</th>
              <th className="table-cell">Term 1</th>
              <th className="table-cell">Term 2</th>
              <th className="table-cell">Term 3</th>
              <th className="table-cell">Van Fees</th>
              <th className="table-cell">Admission Fees</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="table-cell">{studentdata.fees.totalCharges}</td>
              <td className="table-cell">{studentdata.fees.term && studentdata.fees.term[0]}</td>
              <td className="table-cell">{studentdata.fees.term && studentdata.fees.term[1]}</td>
              <td className="table-cell">{studentdata.fees.term && studentdata.fees.term[2]}</td>
              <td className="table-cell">{studentdata.fees.vanFees}</td>
              <td className="table-cell">{studentdata.fees.admissionFees}</td>
            </tr>
          </tbody>
        </Table>
      )}
      <input
        type="text"
        placeholder="Student Name"
        value={studentName}
        onChange={handleStudentNameChange}
      />
      <Button onClick={handleStudentNameSubmit}>Get Student by Name</Button>

      {/* Display students in a popup */}
      <Modal show={students.length > 0} onHide={() => setStudents([])}>
        <Modal.Header closeButton style={{ display: 'flex', justifyContent: 'center' }}>
          <Modal.Title className="modal-title">Students</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table className="students-table">
            <thead>
              <tr>
                <th className="table-cell">First Name</th>
                <th className="table-cell">Roll Number</th>
                <th className="table-cell">Grade</th>
                <th className="table-cell">Admission Number</th>
                <th className="table-cell">Date of Birth</th>
                <th className="table-cell">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.rollNumber}>
                  <td className="table-cell">{student.Name.firstName}</td>
                  <td className="table-cell">{student.rollNumber}</td>
                  <td className="table-cell">{student.grade}</td>
                  <td className="table-cell"> {student.admissionNo}</td>
                  <td className="table-cell">{student.dateOfBirth}</td>
                  <td className="table-cell">
                    <Button onClick={() => handleSelectStudent(student.rollNumber)}>
                      Select
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>

      {/* Display fee details in a separate table */}
      {feeDetails.length > 0 && (
        <Table className="students-table">
          <thead>
            <tr>
              <th className="table-cell">Total Charges</th>
              <th className="table-cell">Balance</th>
              <th className="table-cell">Term 1</th>
              <th className="table-cell">Term 2</th>
              <th className="table-cell">Term 3</th>
              <th className="table-cell">Van Fees</th>
              <th className="table-cell">Admission Fees</th>
            </tr>
          </thead>
          <tbody>
            {feeDetails.map((fee) => (
              <tr key={fee._id}>
                <td className="table-cell">{fee.totalCharges}</td>
                <td className="table-cell">{fee.balance}</td>
                <td className="table-cell">{fee.term && fee.term[0]}</td>
                <td className="table-cell">{fee.term && fee.term[1]}</td>
                <td className="table-cell">{fee.term && fee.term[2]}</td>
                <td className="table-cell">{fee.vanFees}</td>
                <td className="table-cell">{fee.admissionFees}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Transaction;
