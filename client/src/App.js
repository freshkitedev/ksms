import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Navbar from "./Pages/Common/Navbar";
import DashBoard from "./Pages/Dashboard/dashboard";
import CourseFeesComponent from "./Pages/Coursefees/Coursefee.jsx";
import Fullview from "./Pages/Fullview/Fullview";
import StudentsComponent from "./Pages/Student/StudentForm";
// import CourseFeesComponent from "./Pages/Coursefees/Coursefee"
import Transaction from "./Pages/Transaction/Transaction";





function App() {
  return (
    <BrowserRouter>
      <div>
        <br></br>
        <Navbar />
        <br></br>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/fullView" element={<Fullview/>} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/coursefee" element={<CourseFeesComponent />} />
            <Route path="/addstudent" element={<StudentsComponent />} />
            <Route path="/payfee" element={<Transaction />} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
