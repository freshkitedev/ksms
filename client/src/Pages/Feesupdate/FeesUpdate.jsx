import React from "react";
import "./feeupdate.css"

const FeesUpdate = () => {

    return (
        <form>
             
            <div class="head">
                <h2>UPDATE FEES</h2>
            </div>
           
            <div class="item">
                <div className="row">
                <div className="col-3">
                    <label>Course Name:</label>
                    <input
                        type="text"
                        className="form-control"></input>
                </div>
                
           
           
                <div className="col-3">
                    <label>Fees Id:</label>
                    <input
                        type="number"
                        class="form-control"></input>
                </div>
                
               
                <div className="col-3">
                    <label>Course Id:</label>
                    <input type="number" class="form-control"></input>
                </div>
              
              
                
                <div className="col-3">
                    <label>Year:</label>
                    <input type="number" class="form-control"></input>
                </div>
                </div>
                
               <div className="row">
                <div className="col-3">
                    <label>Frequency:</label>
                    <input type="text" class="form-control"></input>
                </div>
               
              
                <div className="col-3">
                    <label>Total Charges:</label>
                    <input type="number" class="form-control"></input>
                </div>
               
                
                <div className="col-3">
                    <label>Term:</label>
                    <input type="text" class="form-control"></input>
                </div>
               
                
                <div className="col-3">
                    <label>Start Date:</label>
                    <input type="date" class="form-control"></input>
                </div>
                </div>
                
                <div className="row">
                <div className="col-3">
                    <label>End Date:</label>
                    <input type="date" class="form-control"></input>
                </div>
               
               
                <div className="col-3">
                    <label>Status:</label>
                    <input type="text" class="form-control"></input>
                </div>
               
               
                <div className="col-3">
                    <label>Course Category:</label>
                    <input type="text" class="form-control"></input>
                </div>
                
                
                
                <div className="col-3">
                    <label>Student Category:</label>
                    <input type="text" class="form-control"></input>
                </div>
                </div>
               <div className="row">
                <div className="col-3">
                    <label>RTE Fees:</label>
                    <input type="number" class="form-control"></input>
                </div>
                <div className="col-3">
                    <label>Van Fees:</label>
                    <input type="number" class="form-control"></input>
                </div>
                <div className="col-3">
                    <label>Admission Fees:</label>
                    <input type="number" class="form-control"></input>
                </div>
                <div className="col-3">
                    <label>Book Fees:</label>
                    <input type="number" class="form-control"></input>
                </div>
                <div className="col-3">
                    <label>Fees Category:</label>
                    <input type="string" class="form-control"></input>
                </div>
                

                </div>
                 

                <div className="btn btn-primary">
                    <button class="btn"> UPDATE FEES</button>
                </div>
                
                
                


              </div>
           



        </form>
    )
}

export default FeesUpdate ;