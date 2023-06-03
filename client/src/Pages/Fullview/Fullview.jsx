import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Fullview.css';

function Fullview() {




  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);


  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      const data = response.data;

      // Ensure each student has the necessary properties (isPaid, isVanStudent, remainingBalance)
      const modifiedData = data.map(student => ({
        ...student,
        isPaid: false, // Placeholder for isPaid property
        isVanStudent: false, // Placeholder for isVanStudent property
        remainingBalance: 0 // Placeholder for remainingBalance property
      }));

      setStudents(modifiedData);
    } catch (error) {
      console.log('Error fetching student data:', error);
    }
  }

  const totalStudents = students.length;
  const totalFeesCollectedToday = students.reduce(
    (total, student) => total + student.feesCollectedToday,
    0
  );
  const remainingFees =
    totalStudents * 100 - totalFeesCollectedToday;

  const totalFeesCollected = students.reduce(
    (total, student) => total + student.totalFeesCollected,
    0
  );


  return (
    <div className="container">

     


      <br></br>

      <div className="container-1 d-flex justify-content-center">
        <div className="card-container">
          <div className="card " style={{ borderRadius: "30px", backgroundColor: "ButtonHighlight" }}>
            <h3 style={{ fontFamily: "fantasy" }}><i class="bi bi-alexa"></i>&nbsp;Kamatchi Shanmugam School - Cuddalore</h3>
            <h5 className='text-primary' style={{ fontFamily: "fantasy" }}><i class="bi bi-person-circle"></i>&nbsp;All Students Details</h5>
            <p><i class="bi bi-person-fill-exclamation"></i>&nbsp;Total Students: {totalStudents}</p>
            <div className="table-responsive ">
              <table className="table table-rounded shadow bg-light">
                <thead>
                  <tr>
                    <th>#</th>
                    <th><i class="bi bi-person"></i>&nbsp;Name</th>
                    <th><i class="bi bi-pc"></i>&nbsp;Status</th>
                    <th><i class="bi bi-credit-card-2-back-fill"></i>&nbsp;Remaining to Pay</th>

                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.id}>
                      <td>{index + 1}</td>
                      <td>{student.name}</td>
                      <td>
                        {student.isPaid ? (
                          <span className="text-success">Paid</span>
                        ) : (
                          <span className="text-danger">Unpaid</span>
                        )}&nbsp;
                        {student.isVanStudent && (
                          <i className="bi bi-shuttle" title="Van Student"></i>
                        )}
                      </td>
                      <td>
                        {student.isPaid ? (
                          '-'
                        ) : (
                          <span className="text-danger">{student.remainingBalance}</span>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>


          <br></br>
          <div className="card-body">
            <div className="table-container">
              <table className="table table-rounded shadow bg-light">
                <thead>
                  <tr className='text-primary' style={{ fontFamily: "monospace" }}>
                    <th className="text-center"><i class="bi bi-person-check"></i>&nbsp;Paid Students Details</th>
                    <th className="text-center"><i class="bi bi-person-dash"></i>&nbsp;Unpaid Students Details</th>
                    <th className="text-center"><i class="bi bi-car-front"></i>&nbsp;Van Students Details</th>
                    <th className="text-center"><i class="bi bi-wallet"></i>&nbsp;Fees Paid Today</th>
                    <th className="text-center"><i class="bi bi-coin"></i>&nbsp;Total Fees Collected</th>
                    <th className="text-center"><i class="bi bi-cash-coin"></i>&nbsp;Total Fees Remaining</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">
                      Paid Students Details
                      {/* Display paid students details */}
                    </td>
                    <td className="text-center">
                      Unpaid Students Details
                      {/* Display unpaid students details */}
                    </td>
                    <td className="text-center">
                      Van Students Details
                      {/* Display van students details */}
                    </td>
                    <td className="text-center">{totalFeesCollectedToday}</td>
                    <td className="text-center">{totalFeesCollected}</td>
                    <td className="text-center">{remainingFees}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>

  );
}

export default Fullview;