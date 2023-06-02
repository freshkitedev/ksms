import React from "react";
import "./addcourse.css"

const Addstudent = () => {

    return (
        <form>
             
            <div className="head">
                <h2>ADD COURSE</h2>
            </div>
           
            <div className="element">
              
                <div class="col-3">
                    <label>Course Name:</label>
                    <input
                        type="text"
                        class="form-control"></input>
                </div>
                
           
           
                <div class="col-3">
                    <label>Course Id:</label>
                    <input
                        type="number"
                        class="form-control"></input>
                </div>
                
               
                <div class="col-3">
                    <label>Course Type:</label>
                    <input type="string" class="form-control"></input>
                </div>
                <br/>
                           
                <div className="text">
                     <button type="button" class="btn btn-primary">ADD COURSE</button>
                </div>
                
                
                
                
              </div>

           
           



        </form>
    )
}

export default Addstudent;