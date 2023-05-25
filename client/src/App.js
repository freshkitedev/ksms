import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login/Login";
import AllDetails from "./Pages/Common/AllDetails";
import Home from "./Pages/Home/Home";
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
            <Route path="/homepageadmin" element={<Home />} />
            <Route path="/coursefee" element={<CourseFeesComponent />} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
