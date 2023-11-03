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
import TransactionUpdate from "./Pages/UpdateTransaction/UpdateTransaction";
import AddStudentForm from "./Pages/Student/Addstudent";
import Expenses from "./Pages/Expenses/expenses.jsx";
import Bankupdate from "./Pages/Bankupdate/bankupdate";
import Report from "./Pages/Report/report.jsx";

function App() {
  return (
    <BrowserRouter>
      <div>
       
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/fullView" element={<Fullview />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/Expenses" element={<Expenses />} />
            <Route path="/Report" element={<Report />} />
            <Route path="/Bankupdate" element={<Bankupdate />} />
            <Route path="/coursefee" element={<CourseFeesComponent />} />
            <Route path="/addstudent" element={<StudentsComponent />} />
            <Route path="/payfee" element={<Transaction />} />
            <Route path="/transaction/:fees" element={<TransactionUpdate />} />
            <Route path="/studentform" element={<AddStudentForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
