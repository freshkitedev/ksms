import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login/Login";
import AllDetails from "./Pages/Common/AllDetails";
import DashBoard from "./Pages/Dashboard/dashboard";
import CourseFeesComponent from "./Pages/Coursefees/Coursefee"





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
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/coursefee" element={<CourseFeesComponent />} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
