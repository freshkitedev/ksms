import React, { useState } from "react";
import { Card, CardDeck, CardSubtitle, CardText, CardHeader, CardFooter } from 'reactstrap';
import "./transaction.css";
import { Button, Modal, Table, Row, Col } from "react-bootstrap";
import axios from "axios";

function Transaction() {
  const [studentId, setStudentId] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentdata, setStudentData] = useState("");
  const [students, setStudents] = useState([]);
  const [feeDetails, setFeeDetails] = useState([]);
  const [activeButton, setActiveButton] = useState("");
  //const [isModalOpen, setIsModalOpen] = useState(false);
  //const [enteredAmount, setEnteredAmount] = useState(0);

  const handleStudentIdChange = (event) => {
    setStudentId(event.target.value);
  };
  const [showDetails, setShowDetails] = useState(false);

  const handleStudentNameChange = (event) => {
    setStudentName(event.target.value);
  };

  const handleStudentIdSubmit = () => {
    if (studentId) {
      // Call backend API to get student by ID
      axios
        .get(`http://localhost:5000/api/student/getusers/${studentId}`)
        .then((response) => {
          setActiveButton("id");
          setStudentData(response.data.fees);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleViewClick = (item) => () => {
    setSelectedItem(item);
    setShowDetails(!showDetails);
    //setIsModalOpen(true);
  };
  const handleStudentNameSubmit = () => {
    if (studentName) {
      // Call backend API to get student by Name
      axios
        .get(`http://localhost:5000/api/student/getusers/name/${studentName}`)
        .then((response) => {
          setStudents(response.data.details);
          setActiveButton("name");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handlePayFees = () => {
    console.log("inside");
    const enteredAmount = parseFloat(document.querySelector('input[type="number"]').value);
    const balance = selectedItem.totalCharges - selectedItem.totalPaid;
    console.log("inside handle pay fees after clicking pay fees");
    if (enteredAmount > balance) {
      console.log("inside if")
      alert("Entered amount is greater than the balance!");
    } else {
      console.log("inside else")
      //setIsModalOpen(true);
    }
  };
  
/*const sendPaymentRequest = () => {
    // Make an API call to the backend using Axios
    axios.post('http://localhost:5000/api/transaction/create', 5000)
      .then((response) => {
        // Handle the response from the backend API
        // For example, display a success message or update the payment status
        alert('Payment successful!');
        setIsModalOpen(false); // Close the modal after successful payment
      })
      .catch((error) => {
        // Handle any errors that occurred during the API call
        console.error('Error making API call:', error);
        alert('Payment failed. Please try again.');
      });
  };*/
  
  const handleSelectStudent = (studentId) => {
    // Call backend API to get student fee details by ID
    axios
      .get(`http://localhost:5000/api/student/getusers/${studentId}`)
      .then((response) => {
        // Display fee details in a table or perform any other action
        console.log(response.data);
        setFeeDetails(response.data.fees);
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
        className="input-field"
      />
      <Button onClick={handleStudentIdSubmit}>Get Student by ID</Button>
      <input
        type="text"
        placeholder="Student Name"
        value={studentName}
        onChange={handleStudentNameChange}
        className="input-field"
      />
      <Button onClick={handleStudentNameSubmit}>Get Student by Name</Button>
      {/* Display fee details in a table */}
      {activeButton === "id" && studentdata.length > 0 && (
        <div>
        <CardDeck>
          <Row>
        {studentdata.map((studentinfo) => (
          <Col sm="6">
          <Card className="card-container">
          <CardHeader>Enrollment {studentinfo.feesCategory} </CardHeader>
              <CardFooter>
              <Button onClick={handleViewClick(studentinfo)}>View</Button>
              </CardFooter>
              {showDetails && selectedItem &&  studentinfo.feesCategory === selectedItem.feesCategory && (
            <Card className="card-container">
              <CardHeader>{selectedItem.feesCategory}</CardHeader>
              {selectedItem.feesCategory === "admissionFees" && (
                <>
              <CardText>Total fees: {selectedItem.totalCharges} </CardText>
              <CardText>Total Paid: {selectedItem.totalPaid} </CardText>
              <CardText>Balance   : {selectedItem.totalCharges - selectedItem.totalPaid} </CardText>
              <input
              type="number"
              placeholder="Enter Amount"
              />
             <Button onClick={handlePayFees}>Pay Fees</Button>
              </>
               )}
              {selectedItem.feesCategory === "termFees" &&  (
              <>
              <CardText>Term1 fees:{selectedItem.term[0]} Term1 Paid:{selectedItem.termPaid[0]} Balance:{selectedItem.term[0]-selectedItem.termPaid[0]}</CardText>
              <CardText>Term2 fees:{selectedItem.term[1]} Term2 Paid:{selectedItem.termPaid[1]} Balance:{selectedItem.term[1]-selectedItem.termPaid[1]}</CardText>
              <CardText>Term3 fees:{selectedItem.term[2]} Term3 Paid:{selectedItem.termPaid[2]} Balance:{selectedItem.term[2]-selectedItem.termPaid[2]}</CardText>
              <input
              type="number"
              placeholder="Enter Amount"
              //value={Enter Amount}
              //onChange={handleStudentIdChange}
               //className="input-field"
              />
             <Button>Pay Fees</Button>
              </>
              )} 
              {selectedItem.feesCategory === "vanFees"  && (
                <>
              <CardText>Total fees: {selectedItem.totalCharges} </CardText>
              <CardText>Total Paid: {selectedItem.totalPaid} </CardText>
              <CardText>Balance   : {selectedItem.totalCharges - selectedItem.totalPaid} </CardText>
              <input
              type="number"
              placeholder="Enter Amount"
              //value={Enter Amount}
              //onChange={handleStudentIdChange}
               //className="input-field"
              />
             <Button>Pay Fees</Button>
              </>
              )}
            </Card>
            )}
          </Card>
          </Col>
           ))}
           </Row>
          </CardDeck>
        </div>
      )}
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
{activeButton === "name" && feeDetails.length > 0 && (
  <div>
    <CardDeck>
      <Row>
    {feeDetails.map((fees) => (
      <Col sm="6">
      <Card className="card-container">
      <CardHeader>Enrollment {fees.feesCategory} </CardHeader>
          <CardSubtitle>{fees.feesCategory}</CardSubtitle>
          <CardText>{fees.totalCharges}</CardText>
          <CardFooter>
          <Button onClick={handleViewClick(fees)}>View</Button>
          </CardFooter>
          {showDetails && selectedItem &&  fees.feesCategory === selectedItem.feesCategory && (
        //<Col sm="6">
        <Card className="card-container">
          <CardHeader>{selectedItem.feesCategory}</CardHeader>
          {selectedItem.feesCategory === "admissionFees" && (
                <>
              <CardText>Total fees: {selectedItem.totalCharges} </CardText>
              <CardText>Total Paid: {selectedItem.totalPaid} </CardText>
              <CardText>Balance   : {selectedItem.totalCharges - selectedItem.totalPaid} </CardText>
              <input
              type="number"
              placeholder="Enter Amount"
              //value={Enter Amount}
              //onChange={handleStudentIdChange}
               //className="input-field"
              />
             <Button>Pay Fees</Button>
              </>
               )}
              {selectedItem.feesCategory === "termFees" &&  (
              <>
              <CardText>Term1 fees:{selectedItem.term[0]} Term1 Paid:{selectedItem.termPaid[0]} Balance:{selectedItem.term[0]-selectedItem.termPaid[0]}</CardText>
              <CardText>Term2 fees:{selectedItem.term[1]} Term2 Paid:{selectedItem.termPaid[1]} Balance:{selectedItem.term[1]-selectedItem.termPaid[1]}</CardText>
              <CardText>Term3 fees:{selectedItem.term[2]} Term3 Paid:{selectedItem.termPaid[2]} Balance:{selectedItem.term[2]-selectedItem.termPaid[2]}</CardText>
              <input
              type="number"
              placeholder="Enter Amount"
              //value={Enter Amount}
              //onChange={handleStudentIdChange}
               //className="input-field"
              />
             <Button>Pay Fees</Button>
              </>
              )} 
              {selectedItem.feesCategory === "vanFees"  && (
                <>
              <CardText>Total fees: {selectedItem.totalCharges} </CardText>
              <CardText>Total Paid: {selectedItem.totalPaid} </CardText>
              <CardText>Balance   : {selectedItem.totalCharges - selectedItem.totalPaid} </CardText>
              <input
              type="number"
              placeholder="Enter Amount"
              //value={Enter Amount}
              //onChange={handleStudentIdChange}
               //className="input-field"
              />
             <Button>Pay Fees</Button>
              </>
              )}
        </Card>
        //</Col>
      )}
      </Card>
      </Col>
       ))}
      </Row>
      </CardDeck>
    </div>
    )}
  </div>
)}
export default Transaction; 



