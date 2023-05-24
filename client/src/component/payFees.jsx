import React, { useState } from "react";
import Header from "./header";
import axios from "axios";

function PayFees() {
  const [data, setData] = useState([]);
  const id = "646a122eec66ba2db472379b";
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .get(`http://localhost:5000/api/student/getusers/${id}`)
    .then((result) => {
      setData(result.data);
      console.log("student data", data);
    });
    console.log("You clicked submit.", data);
  };
  return (
    <>
      <Header />
      <div className="main-wrapper">
        <div className="containers">
          <div className="containerId">
            <form>
              <div className="mt-3">
                <label className="col-xl-5">Student Id </label>
                <input
                  className="box col-xl-5"
                  name="student_id"
                />
              </div>
              </form>
              <form>
              <div className="mt-3">
                <label className="col-xl-5">Student Name </label>
                <input
                  className="box col-xl-5"
                  name="student_name"
                  
                />
              </div>
              </form>
              <form>
              <div>
                <button className="buttons mt-5" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PayFees;
