import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login/Login";
import AllDetails from "./Pages/Common/AllDetails";
import DashBoard from "./Pages/Dashboard/dashboard";
import CourseFeesComponent from "./Pages/Coursefees/Coursefee"
import AddCourse from "./Pages/Addcourse/AddCourse.jsx"
import FeesUpdate from "./Pages/Feesupdate/FeesUpdate"



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
            <Route path="/addcourse" element={<AddCourse/>}/>
            <Route path="/feesupdate" element={<FeesUpdate/>}/>
            

           


          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
