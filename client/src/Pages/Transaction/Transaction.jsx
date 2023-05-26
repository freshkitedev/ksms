import React, { useState } from "react";
import "./transaction.css"
// import Header from "./header";
import axios from "axios";

function Transaction() {
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
      {/* <div className="main-wrapper">
        <div className="containers">
          <div className="containerId">
            <form className="Search-pay">
              <div className="mt-3">
                <label className="col-xl-5">Student Id </label>
                <input className="box col-xl-5" name="student_id" />
              </div>
            </form>
            <form className="Search-pay">
              <div className="Search-name">
                <label className="col-xl-5">Student Name </label>
                <input className="box col-xl-5" name="student_name" />
              </div>
            </form>
            <form className="Search-pay">
              <div>
                <button className="buttons mt-5" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
      <div className="trans">
        <div className="search">
            <form>
                <label className="search-lab">
                    Student Id
                </label>
                <input />
            </form>
        </div>
        <div className="search">
            <form>
                <label className="search-lab">
                    Student Name
                </label>
                <input />
            </form>
        </div >
        <button className="button">Submit</button>
      </div>
    </>
  );
}

export default Transaction;
