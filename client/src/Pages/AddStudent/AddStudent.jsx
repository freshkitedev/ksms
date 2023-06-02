import React from "react";
import "./AddStudent.css";

const Addstudent = () => {

    return (
        <form>

            <div class="head">
                <h2>ADD STUDENT</h2>
            </div>

            <div class="item">
                <div className="row">
                    <div className="col-3">
                        <label>Roll Number:</label>
                        <input
                            type="number"
                            className="form-control"></input>
                    </div>
                    <div className="col-3">
                        <label>Student Name:</label>
                        <input
                            type="string"
                            class="form-control"></input>
                    </div>
                    <div className="col-3">
                        <label>Middle Name:</label>
                        <input type="string" class="form-control"></input>
                    </div>
                    <div className="col-3">
                        <label>Last Name:</label>
                        <input type="string" class="form-control"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <label>DOB:</label>
                        <input type="date" class="form-control"></input>
                    </div>
                    <div className="col-3">
                        <label>Father Name:</label>
                        <input type="string" class="form-control"></input>
                    </div>
                    <div className="col-3">
                        <label>Mother Name:</label>
                        <input type="string" class="form-control"></input>
                    </div>
                    <div className="col-3">
                        <label>Home Address:</label>
                        <input type="text" class="form-control"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <label>Email Id</label>
                        <input type="text" class="form-control"></input>
                    </div>
                    <div className="col-3">
                        <label>Enrollment Date:</label>
                        <input type="date" class="form-control"></input>
                    </div>
                    <div className="col-3">
                        <label>Mobile No:</label>
                        <input type="number" class="form-control"></input>
                    </div>
                    <div className="col-3">
                        <label>Acadmic Year:</label>
                        <input type="number" class="form-control"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <label>EMIS Number:</label>
                        <input type="number" class="form-control"></input>
                    </div>
                    <div className="col-3">
                        <label>AdmissionNumber:</label>
                        <input type="number" class="form-control"></input>
                    </div>
                    <div className="col-3">
                        <label>Van Applicable:</label>
                        <input type="number" class="form-control"></input>
                    </div>
                    <div className="col-3">
                        <label>Van Stop:</label>
                        <input type="string" class="form-control"></input>
                    </div>
                </div>


                <div className="btn btn-primary">
                    <button class="btn"> CREATE STUDENT</button>
                </div>
            </div>
        </form>
    )
}

export default Addstudent;