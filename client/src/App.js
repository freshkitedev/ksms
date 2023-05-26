import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login/Login";
import AllDetails from "./Pages/Common/AllDetails";
import Home from "./Pages/Home/Home";
import CourseFeesComponent from "./Pages/Coursefees/Coursefee"
import Transaction from "./Pages/Transaction/Transaction";





function App() {
  return (
    <BrowserRouter>
      <div>
        <br></br>
        <AllDetails />
        <br></br>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/homepageadmin" element={<Transaction />} />
            <Route path="/coursefee" element={<CourseFeesComponent />} />
            <Route path="/payfee" element={<Transaction />} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
