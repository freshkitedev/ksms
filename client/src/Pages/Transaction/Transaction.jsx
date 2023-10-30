import React, { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import "../UpdateTransaction/UpdateTransaction.css";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardDeck,
  CardSubtitle,
  CardText,
  CardHeader,
  CardFooter,
} from "reactstrap";
import "./transaction.css";
import { Button, Modal, Table, Row, Col, Tabs, Tab } from "react-bootstrap";

import axios from "axios";
import Backbutton from "../../component/backbutton";
import Navbar from "../Common/Navbar";
const ReceiptContent = ({ receiptRef, transaction }) => {
  //const componentRef = useRef(null);
  var studentdata;
  const [studentdetails, setstudentdetails] = useState(null);
  console.log("transaction data", transaction);
  var rollnum = transaction.rollNumber;

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/student/getusers/${rollnum}`)
      .then((response) => {
        studentdata = response.data?.details;
        console.log("student data", studentdata);
        setstudentdetails(studentdata);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
};

function Transaction() {
  //const location = useLocation();
  //const { location } = props;
  const navigate = useNavigate();
  // var [studentId, setStudentId] = useState("");
  var [studentId, setStudentId] = useState(
    () => localStorage.getItem("studentId") || ""
  );
  var [selectedItem, setSelectedItem] = useState(
    () => localStorage.getItem("selectedItem") || ""
  );
  var [studentName, setStudentName] = useState(
    () => localStorage.getItem("studentName") || ""
  );
  var [studentdata, setStudentData] = useState(
    () => localStorage.getItem("studentdata") || ""
  );
  var [students, setStudents] = useState(
    () => localStorage.getItem("students") || []
  );
  var [feeDetails, setFeeDetails] = useState(
    () => localStorage.getItem("feeDetails") || []
  );
  var [activeButton, setActiveButton] = useState(
    () => localStorage.getItem("activeButton") || []
  );
  var [previousTransactions, setPreviousTransactions] = useState([]);
  var [showPreviousTransaction, setShowPreviousTransaction] = useState(false);
  var [CurrentTransaction, setCurrentTransaction] = useState(null);

  const handlePayFees = (feedata) => {
    const feesJson = JSON.stringify(feedata);
    navigate(`/transaction/${encodeURIComponent(feesJson)}`, {
      activeButton,
      studentdata,
      students,
      feeDetails,
      showDetails,
      selectedItem,
    });
  };
  useEffect(() => {
    localStorage.setItem("studentId", studentId);
    //localStorage.setItem('selectedItem', JSON.stringify(selectedItem));
    localStorage.setItem("studentName", studentName);
    // localStorage.setItem('previousTransactions', previousTransactions);
    // ... save other relevant state data here
  }, [studentId, selectedItem, studentName]);
  const handleStudentIdChange = (event) => {
    console.log("inside set student id");
    setStudentId(event.target.value);
    console.log("calling gettable data function");
    getTableData(event.target.value);
  };

  var [showDetails, setShowDetails] = useState(
    () => localStorage.getItem("showDetails") || false
  );

  const handleStudentNameChange = (event) => {
    setStudentName(event.target.value);
  };

  const handleStudentIdSubmit = () => {
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
  };

  const handleViewClick = (item) => () => {
    setSelectedItem(item);
    setShowDetails(!showDetails);
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

  const handleSelectStudent = (studentId) => {
    // Call backend API to get student fee details by ID
    console.log("setting the student id");
    setStudentId(studentId);
    console.log("set the student id");
    axios
      .get(`http://localhost:5000/api/student/getusers/${studentId}`)
      .then((response) => {
        // Display fee details in a table or perform any other action
        console.log(response.data);
        setFeeDetails(response.data.fees);
        console.log("calling gettable data fucn");
        getTableData(studentId);
        console.log("called gettabledata()");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getTableData = (studentId) => {
    console.log("inside gettabledata()");
    axios
      .get(
        `http://localhost:5000/api/transaction/getalltransaction/${studentId}`
      )
      .then((response) => {
        console.log(response.data);
        setPreviousTransactions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    return;
  };

  const handlePreviousTransactionModal = (id, transactions) => {
    console.log("setting current transaction");
    setCurrentTransaction(transactions);
    console.log("setting current transaction done");
    handleShowTransactionModal();
  };
  /*useEffect(() => {
    console.log("CurrentTransaction updated:", CurrentTransaction);
  }, [CurrentTransaction]); */

  const handleShowTransactionModal = () => {
    setShowPreviousTransaction(true);
  };
  const receipt = useRef(null);
  const generateReceiptPDF = (transaction) => {
    console.log("enrollment data", transaction);
    const rollnumber = transaction.rollNumber;
    // Call backend API to get student by ID
    axios
      .get(`http://localhost:5000/api/student/getusers/${rollnumber}`)
      .then((response) => {
        var studentdata = response.data?.details;
        console.log("student data", studentdata);
        const currentDate = CurrentTransaction.dateOfTxn;
        var formattedDate = currentDate.slice(0, 10);
        const input = receipt.current;
        html2canvas(input).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF();

          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
          const studentName = studentdata.Name.firstName;
          const enrollmentInfo = CurrentTransaction;
          console.log(enrollmentInfo.courseName);
          const transactionInfo = CurrentTransaction;
          console.log(transactionInfo.dateOfTxn);
          const enrollmentdata = enrollmentInfo.txnCategory;
          const fileName = `${studentName}_${enrollmentdata}_${formattedDate}.pdf`;
          pdf.save(fileName);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <React.Fragment>
      <div>
        <Navbar/>
      <div className="backbutton">
        <Backbutton/>

      </div>
      
        <Tabs
          defaultActiveKey="PayFee"
          style={{
            marginLeft: "100px",
            marginTop: "80px",
            fontFamily: "arial",
            fontSize: "20px",
            color: "white",
          }}
        >
          <Tab eventKey="PayFee" title="PayFee">
            <h2
              style={{
                textAlign: "center",
                fontFamily: "arial",
                color: "black",
                marginTop: "5px",
              }}
            >
              <i class="bi bi-person-circle"></i>&nbsp;PayFee
            </h2>
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
            <Button onClick={handleStudentNameSubmit}>
              Get Student by Name
            </Button>
            {activeButton === "id" && studentdata.length > 0 && (
              <div className="align-modals">
                <CardDeck>
                  <Row>
                    {studentdata.map((studentinfo, index) => (
                      <Col sm="6">
                        <Card className="card-container">
                          <CardHeader>
                            <p className="modal-header">
                              PayFee {studentinfo.feesCategory}
                            </p>
                          </CardHeader>
                          <CardFooter>
                            <Button onClick={handleViewClick(studentinfo)}>
                              <i class="bi bi-chevron-double-down"></i>
                            </Button>
                          </CardFooter>
                          {showDetails &&
                            selectedItem &&
                            studentinfo.feesCategory ===
                              selectedItem.feesCategory && (
                              <Card className="card-container">
                                {selectedItem.feesCategory ===
                                  "admissionFees" && (
                                  <>
                                    <CardText>
                                      Total fees: {selectedItem.totalCharges}{" "}
                                    </CardText>
                                    <CardText>
                                      Total Paid: {selectedItem.totalPaid}{" "}
                                    </CardText>
                                    <CardText>
                                      Balance :{" "}
                                      {selectedItem.totalCharges -
                                        selectedItem.totalPaid}{" "}
                                    </CardText>
                                    <Button
                                      onClick={() =>
                                        handlePayFees(selectedItem)
                                      }
                                    >
                                      <i class="bi bi-currency-rupee"></i>Pay
                                      Fees
                                    </Button>
                                  </>
                                )}
                                {selectedItem.feesCategory === "termFees" && (
                                  <>
                                    <CardText>
                                      Term1 fees:{selectedItem.term[0]} Term1
                                      Paid:{selectedItem.termPaid[0]} Balance:
                                      {selectedItem.term[0] -
                                        selectedItem.termPaid[0]}
                                    </CardText>
                                    <CardText>
                                      Term2 fees:{selectedItem.term[1]} Term2
                                      Paid:{selectedItem.termPaid[1]} Balance:
                                      {selectedItem.term[1] -
                                        selectedItem.termPaid[1]}
                                    </CardText>
                                    <CardText>
                                      Term3 fees:{selectedItem.term[2]} Term3
                                      Paid:{selectedItem.termPaid[2]} Balance:
                                      {selectedItem.term[2] -
                                        selectedItem.termPaid[2]}
                                    </CardText>
                                    <Button
                                      className="btn btn-primary"
                                      onClick={() =>
                                        handlePayFees(selectedItem)
                                      }
                                    >
                                      <i class="bi bi-currency-rupee"></i>Pay
                                      Fees
                                    </Button>
                                  </>
                                )}
                                {selectedItem.feesCategory === "vanFees" && (
                                  <>
                                    <CardText>
                                      Total fees: {selectedItem.totalCharges}{" "}
                                    </CardText>
                                    <CardText>
                                      Total Paid: {selectedItem.totalPaid}{" "}
                                    </CardText>
                                    <CardText>
                                      Balance :{" "}
                                      {selectedItem.totalCharges -
                                        selectedItem.totalPaid}{" "}
                                    </CardText>
                                    <Button
                                      className="btn btn-primary"
                                      onClick={() =>
                                        handlePayFees(selectedItem)
                                      }
                                    >
                                      <i class="bi bi-currency-rupee"></i>Pay
                                      Fees
                                    </Button>
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
            <div style={{ marginTop: "40px" }}>
              <Modal show={students.length > 0} onHide={() => setStudents([])}>
                <Modal.Header
                  closeButton
                  style={{ display: "flex", justifyContent: "center" }}
                >
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
                          <td className="table-cell">
                            {student.Name.firstName}
                          </td>
                          <td className="table-cell">{student.rollNumber}</td>
                          <td className="table-cell">{student.grade}</td>
                          <td className="table-cell"> {student.admissionNo}</td>
                          <td className="table-cell">{student.dateOfBirth}</td>
                          <td className="table-cell">
                            <Button
                              onClick={() =>
                                handleSelectStudent(student.rollNumber)
                              }
                            >
                              Select
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Modal.Body>
              </Modal>
            </div>
            {activeButton === "name" && feeDetails.length > 0 && (
              <div>
                <CardDeck>
                  <Row>
                    {feeDetails.map((fees) => (
                      <Col sm="6">
                        <Card className="card-container">
                          <CardHeader>
                            Enrollment {fees.feesCategory}{" "}
                          </CardHeader>
                          <CardSubtitle>{fees.feesCategory}</CardSubtitle>
                          <CardText>{fees.totalCharges}</CardText>
                          <CardFooter>
                            <Button onClick={handleViewClick(fees)}>
                              <i class="bi bi-chevron-double-down"></i>
                            </Button>
                          </CardFooter>
                          {showDetails &&
                            selectedItem &&
                            fees.feesCategory === selectedItem.feesCategory && (
                              //<Col sm="6">
                              <Card className="card-container">
                                {selectedItem.feesCategory ===
                                  "admissionFees" && (
                                  <>
                                    <CardText>
                                      Total fees: {selectedItem.totalCharges}{" "}
                                    </CardText>
                                    <CardText>
                                      Total Paid: {selectedItem.totalPaid}{" "}
                                    </CardText>
                                    <CardText>
                                      Balance :{" "}
                                      {selectedItem.totalCharges -
                                        selectedItem.totalPaid}{" "}
                                    </CardText>
                                    <Button
                                      className="btn btn-primary"
                                      onClick={() =>
                                        handlePayFees(selectedItem)
                                      }
                                    >
                                      <i class="bi bi-currency-rupee"></i>Pay
                                      Fees
                                    </Button>
                                  </>
                                )}
                                {selectedItem.feesCategory === "termFees" && (
                                  <>
                                    <CardText>
                                      Term1 fees:{selectedItem.term[0]} Term1
                                      Paid:{selectedItem.termPaid[0]} Balance:
                                      {selectedItem.term[0] -
                                        selectedItem.termPaid[0]}
                                    </CardText>
                                    <CardText>
                                      Term2 fees:{selectedItem.term[1]} Term2
                                      Paid:{selectedItem.termPaid[1]} Balance:
                                      {selectedItem.term[1] -
                                        selectedItem.termPaid[1]}
                                    </CardText>
                                    <CardText>
                                      Term3 fees:{selectedItem.term[2]} Term3
                                      Paid:{selectedItem.termPaid[2]} Balance:
                                      {selectedItem.term[2] -
                                        selectedItem.termPaid[2]}
                                    </CardText>
                                    <Button
                                      className="btn btn-primary"
                                      onClick={() =>
                                        handlePayFees(selectedItem)
                                      }
                                    >
                                      <i class="bi bi-currency-rupee"></i>Pay
                                      Fees
                                    </Button>
                                  </>
                                )}
                                {selectedItem.feesCategory === "vanFees" && (
                                  <>
                                    <CardText>
                                      Total fees: {selectedItem.totalCharges}{" "}
                                    </CardText>
                                    <CardText>
                                      Total Paid: {selectedItem.totalPaid}{" "}
                                    </CardText>
                                    <CardText>
                                      Balance :{" "}
                                      {selectedItem.totalCharges -
                                        selectedItem.totalPaid}{" "}
                                    </CardText>
                                    <Button
                                      onClick={() =>
                                        handlePayFees(selectedItem)
                                      }
                                    >
                                      <i class="bi bi-currency-rupee"></i>Pay
                                      Fees
                                    </Button>
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
          </Tab>
          <Tab eventKey="transactions" title="Transactions">
            <div style={{ marginTop: "40px", width: "500px" }}>
              <Modal
                show={showPreviousTransaction}
                onHide={() => setShowPreviousTransaction(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <h4>Transaction Details</h4>
                </Modal.Header>
                <Modal.Body>
                  {CurrentTransaction != null && (
                    <ReceiptContent
                      receiptRef={receipt}
                      transaction={CurrentTransaction}
                    />
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    onClick={() => generateReceiptPDF(CurrentTransaction)}
                  >
                    Generate <i class="bi bi-file-earmark-pdf-fill"></i>
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div>
              <h2
                style={{
                  textAlign: "center",
                  fontFamily: "arial",
                  color: "black",
                  marginTop: "5px",
                }}
              >
                <i class="bi bi-person-circle"></i>&nbsp;Transaction Details
              </h2>
              {previousTransactions && previousTransactions.length > 0 ? (
                <div className="table-align-modals">
                  <Table responsive="sm" striped="columns">
                    <thead>
                      <tr>
                        <th>Date Of Transaction</th>
                        <th>Student Enrollment</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    {previousTransactions.map((transactions) => (
                      <tbody>
                        <tr>
                          <td>{transactions.dateOfTxn}</td>
                          <td>{transactions.txnCategory}</td>
                          <td>
                            <Button
                              id={transactions.id}
                              variant="link"
                              style={{ color: "black" }}
                              onClick={() =>
                                handlePreviousTransactionModal(
                                  transactions.id,
                                  transactions
                                )
                              }
                            >
                              <strong>
                                <i class="bi bi-eye-fill"></i>
                              </strong>
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </Table>
                </div>
              ) : (
                <p className="modal-header align-modals">
                  No previous transactions available.
                </p>
              )}
            </div>
          </Tab>
        </Tabs>
      </div>
    </React.Fragment>
  );
}
export default Transaction;
