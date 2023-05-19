import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {




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
      <nav className="navbar shadow navbar-expand-lg navbar-light bg-light p-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <h2 style={{ fontFamily: 'cursive' }}>
              <b>
                <i className="bi bi-alexa"></i>&nbsp;Ksms
              </b>
            </h2>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link mx-2" to="/" activeClassName="active">
                  <i className="bi bi-house"></i>&nbsp;Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-2" to="/" activeClassName="active">
                  <i className="bi bi-people"></i>&nbsp;School
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-2" to="/" activeClassName="active">
                  <i className="bi bi-bank"></i>&nbsp;Fees
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link mx-2 dropdown-toggle"
                  to="/"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  About <i className="bi bi-three-dots-vertical"></i>
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link className="dropdown-item" to="/">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      Contact us
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto d-none d-lg-inline-flex">
              <div className="btn btn-outline-dark">
                <i className="bi bi-r-circle"></i>&nbsp;Register
              </div>
              <li className="nav-item mx-2">
                <Link className="nav-link text-dark h5" to="" target="blank">
                  <i className="bi bi-google"></i>
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link text-dark h5" to="" target="blank">
                  <i className="bi bi-twitter"></i>
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link text-dark h5" to="" target="blank">
                  <i className="bi bi-facebook"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>


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

export default Home;
