import axios from "axios";
import jsPDF from "jspdf";
import "./UpdateTransaction.css"
import { useNavigate } from 'react-router-dom';
import html2canvas from "html2canvas";
import React, { useRef, useState, useEffect} from "react";
import { useParams } from 'react-router-dom';

const ReceiptContent = ({ studentdata, enrollment }) => {
  const componentRef = useRef(null);
  const currentDate = enrollment[1].dateOfTxn;
  var formattedDate = currentDate.slice(0, 10);
  var [transactionInfoData, setTransactionInfoData] = useState(null);
  var [enrollmentInfoData, setEnrollmentInfoData] = useState(null);
  const generateReceiptPDF = () => {
    const input = componentRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      const studentName = studentdata.studentName
      const enrollmentInfo = enrollment[0];
      console.log(enrollmentInfo.courseName)
      setEnrollmentInfoData(enrollmentInfo);
      const transactionInfo = enrollment[1];
      console.log(transactionInfo.dateOfTxn);
      setTransactionInfoData(transactionInfo)
      const enrollmentdata = enrollmentInfo.feesCategory
      const fileName = `${studentName}_${enrollmentdata}_${formattedDate}.pdf`;
      pdf.save(fileName);
    });
  };

  return (
    <div id="receipt-container" ref={componentRef}>
      <div class="flex-container">
      <h2 style={{ marginLeft:"100px", textAlign: "center", fontFamily: "fantasy", color: "black", marginTop: "2em", marginBottom: "2em"}}>Kamatchi Shanmugam Matriculation Higher Secondary School</h2>
      </div>
      <h3 style={{ marginLeft:"100px", textAlign: "center", fontFamily: "fantasy", color: "black", marginBottom: "1em"}}>Transaction Details</h3>
      <div>
      <div class="block">
      <label className="label"> Student Name        :</label>
      <span className="span">{studentdata.studentName}</span>     
      </div>
      </div>
      <div>
      <div class="block">
      <label className="label"> Roll Number         : </label>
      <span className="span">{studentdata.rollNumber}</span>
      </div>
      </div> 
      <div>
      <div class="block">
      <label className="label"> Class               :</label>
      <span className="span">{studentdata.courseName}</span>
      </div>
      </div> 
      <div>
      <div class="block">
      <label className="label"> Enrollment          : </label>
      <span className="span">{studentdata.txnCategory}</span>
      </div>
      </div>
      <div>
      <div class="block">
      <label className="label"> Paid Amount        :</label>
      <span className="span">{studentdata.txnAmount}</span>
      </div>
      </div>
      <div>
      <div class="block">
      <label className="label"> Payment Mode       :</label>
      <span className="span">{studentdata.paymentMode}</span>
      </div>
      </div>
      <div>
      <div class="block">
      <label className="label"> Transaction type   : </label>
      <span className="span">{studentdata.txnType}</span>
      </div>
      </div>
      <div>
      <div class="block">
      <label className="label"> Date              : </label>
      <span className="span">{formattedDate}</span>
      </div>
      </div>
      <button style={{ marginLeft:"900px", fontFamily: "fantasy", marginTop: "3em"}} onClick={generateReceiptPDF}>Generate PDF</button>
    </div>
  );
};

function TransactionUpdate() {
    const { fees } = useParams();
    const parsedFees = fees ? JSON.parse(decodeURIComponent(fees)) : null;
    console.log("done1");
    console.log(parsedFees);
    console.log("done2");
    console.log(parsedFees.userId)
    const [studentName, setStudentName] = useState("");
    const [paymentMode, setPaymentMode] = useState(null);
    const [paymentModeVal, setPaymentModeVal] = useState("");
    const [transactionVal, setTransactionVal] = useState("");
    const [transactionType, setTransactionType] = useState(null);
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
    const [data, setData] = useState("")
    const [studentdata, setStudentData] = useState("")
    var enrollment = "";
    if(parsedFees.feesCategory == "termFees") {
      enrollment = "Term Fees"
    } else if(parsedFees.feesCategory == "admissionFees") {
      enrollment = "Admission Fees"
    } else {
      enrollment = "Van Fees"
    }
    const rollNumber = parsedFees.userId
    const courseName = parsedFees.courseName
    useEffect(() => {
    const getStudent = () => {
      // Fetch student data from the backend API
      axios.get(`http://localhost:5000/api/student/getusers/${rollNumber}`)
        .then(response => {
          // Update the input field values with the retrieved data
          setStudentName(response.data.details.Name.firstName);
          console.log(studentName);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };
    const getPaymentMode = () => {
      axios.get('http://localhost:5000/api/static/getallpaymentmode')
        .then(response => {
          console.log(response.data.result);
          const paymentArray = response.data.result;
          const paymentModeList = [];
          for (let index = 0; index < paymentArray.length; index++) {
            console.log(paymentArray[index].paymentMode);
            paymentModeList[index] = paymentArray[index].paymentMode; 
        }
        setPaymentMode(paymentModeList);
        setPaymentModeVal(paymentModeList[0]);
          console.log(paymentModeList);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };
    const getTransactionType = () => {
      axios.get('http://localhost:5000/api/static/getalltransactiontype')
        .then(response => {
          console.log(response.data.result);
          setTransactionType(response.data.result.transactionType)
          const transactionArray = response.data.result;
          const transactionList = [];
          for (let index = 0; index < transactionArray.length; index++) {
            console.log(transactionArray[index].transactionType);
            transactionList[index] = transactionArray[index].transactionType; 
        }
        setTransactionType(transactionList);
        setTransactionVal(transactionList[0]);
          console.log(transactionList);
          console.log(transactionType);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };
    getStudent();
    getPaymentMode();
    getTransactionType();
  }, []);

    const [transactionAmt, setTransactionAmt] = useState(0);
    const [transactionYear, setTransactionYearObj] = useState("");
    const [transactionNotes, setTransactionNotes] = useState("");
    const handleTransactionAmtChange = (event) => {
      const value = parseInt(event.target.value);
      setTransactionAmt(value);
    };

    const handleTransactionNotesChange = (event) => {
      setTransactionNotes(event.target.value);
    };

    const handleTransactionYearChange = (event) => {
      setTransactionYearObj(parsedFees.year);
    };
    const handlePaymentModeChange = (event) => {
      setPaymentModeVal(event.target.value);
    };
  
    const handleTransactionTypeChange = (event) => {
      setTransactionVal(event.target.value);
    };

    const handleMakePayment = async () => {
      try {
        const dataval = {
          studentName: studentName,
          rollNumber: rollNumber,
          paymentMode: paymentModeVal,
          txnCategory: parsedFees.feesCategory,
          courseName: parsedFees.courseName,
          txnType: transactionVal,
          txnAmount: transactionAmt,
          year: transactionYear,
          txnNotes: transactionNotes,
        };

        setStudentData(dataval);
        // Make a POST request to the backend API
        const response = await axios.post(
          "http://localhost:5000/api/transaction/create",
          dataval
        );
  
        // If the payment is successful, set the success state
        console.log(response.data);
        setData(response.data)
        if (response.data && response.data.length > 0 && response.data[0]._id ) {
          setIsPaymentSuccess(true);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const handlePageredirect = () => {
      window.history.back(); 
    };
return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ marginLeft:"500px", textAlign: "center", fontFamily: "fantasy", color: "white", marginBottom: "1em"}}>
        <i class="bi bi-person-circle"></i>&nbsp;Transaction Details
        </h2>
        <button class="btn btn-primary" style={{marginRight:"100px", fontFamily: "fantasy", fontSize: "16px" }} onClick={() =>  handlePageredirect()}>
        Back
        </button>
        </div>
        <div>
        <div class="block">
        <label className="label">Student Name:</label>
        <input style={{ marginLeft:"50px", width: "250px", alignitems: "flex-start" }} type="text" value={studentName} />
        </div> 
        </div>
        <div>
        <div class="block">
        <label className="label">Roll Number:</label>
        <input id="rollNumberInput" style={{ marginLeft:"50px", width: "250px", alignitems: "flex-start"}} type="text" value={rollNumber} />
        </div> 
        </div>
        <div>
        <div class="block">
        <label className="label">Enrollment:</label>
        <input id="enrollmentInput" style={{ marginLeft:"50px", width: "250px" }} type="text" value={enrollment}  />
        </div> 
        </div>
        <div>
        <div class="block">
        <label className="label">Course Name:</label>
        <input id="enrollmentInput" style={{ marginLeft:"50px", width: "250px" }} type="text" value={courseName}  />
        </div> 
        </div>
        <div>
        <div class="block">
        <label className="label">Transaction Year:</label>
        <input id="transactionYear" style={{ marginLeft:"50px", width: "250px" }} type="text" value={transactionYear} onChange={handleTransactionYearChange}/>
        </div> 
        </div>
        <div>
        <div class="block">
        <label className="label">Transaction Amount:</label>
        <input style={{ marginLeft:"50px", width: "250px" }} type="number" placeholder="Enter Amount" value={transactionAmt} onChange={handleTransactionAmtChange} />
        </div> 
        </div>
        <div>
        <div class="block">
        <label className="label">Payment Mode:</label>
        {paymentMode != null  && paymentMode.length > 0 && (
        <select style={{ marginLeft:"50px", width: "250px" }} value={paymentModeVal} onChange={handlePaymentModeChange}>
          {paymentMode.map((mode) => (
            <option key={mode} value={mode}>{mode}</option>
          ))}
        </select>
        )}
        </div> 
        </div>
        <div>
        <div>
        <label className="label">Transaction Type:</label>
        {transactionType != null  && transactionType.length > 0 && (
        <select style={{ marginLeft:"50px", width: "250px" }} value={transactionVal} onChange={handleTransactionTypeChange} >
          {transactionType.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        )}
        </div> 
        </div>
        <div>
        <div class="block">
        <label className="label">Transaction Notes:</label>
        <input style={{ marginLeft:"50px", width: "250px" }} type="text" placeholder="Enter Any string" value={transactionNotes} onChange={handleTransactionNotesChange} />
        </div> 
        </div>
      <button
        style={{
          display: "block",
          marginBottom: "1em",
          marginLeft: "700px",
          marginRight: "auto",
          marginTop: "10px",
          backgroundColor: "DeepSkyBlue",
          color: "white",
          fontFamily: "fantasy",
          padding: "6px"
        }}
        onClick={() => handleMakePayment()}
      >
        Make Payment
      </button>
      {isPaymentSuccess && <ReceiptContent studentdata={studentdata} enrollment={data} />}
    </div>
)

}

export default TransactionUpdate;