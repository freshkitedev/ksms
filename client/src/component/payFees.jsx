// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "./header";

// function PayFees() {
//   const [data, setData] = useState([]);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await axios.get('http://localhost:5000/api/student/getstudent');
//   //       setData(response.data);
//   //     } catch (error) {
//   //       console.error('Error fetching data:', error);
//   //     }
//   //   };

//   //   fetchData();
//   //   console.log("Student details",data);
//   // }, []);

//    function handleClick() {
//     console.log("I'm a handleClick function");
//     const id = "646a122eec66ba2db472379b";
    // axios
    //   .get(`http://localhost:5000/api/student/getusers/${id}`)
    //   .then((result) => {
    //     setData(result.data);
    //     console.log("student data", data);
    //   });
//   };

//   // useEffect(() => {
//   //   getStudent();
//   // },[]);

//   // const getStudent = () => {
//   //   axios.get("http://localhost:5000/api/student/getstudent").then((result) => {
//   //     setData(result.data);
//   //     console.log("student details" ,data);
//   //   });
//   // };

//   return (
//     <>
//       <Header />
//       <div className="main-wrapper">
//         <div class="container">
//           <h3 className="pt-5">Student Fees Transaction</h3>
//           <div className="containerBody">
//             <form>
//               <div className="pt-3">
//                 <label className="col-xl-3">Student Id </label>
//                 <input className="box col-xl-5" name="selectedClusters" />
//               </div>
//               <div className="pt-3">
//                 <label className="col-xl-3">Student Name </label>
//                 <input className="box col-xl-5" name="selectedClusters" />
//               </div>
//               <div className="pt-3">
//                 <label className="col-xl-3">Amount</label>
//                 <input className="box col-xl-5" name="selectedClusters" />
//               </div>
//               <div className="pt-3">
//                 <label className="col-xl-3">Class</label>
//                 <input className="box col-xl-5" name="selectedClusters" />
//               </div>
//               <div className="pt-3">
//                 <label className="col-xl-3">Course</label>
//                 <select className="box col-xl-5" name="selectedClusters">
//                   <option value="" defaultValue>
//                     Select Course
//                   </option>
//                 </select>
//               </div>
//               <div className="pt-3">
//                 <label className="col-xl-3">Payment Type </label>
//                 <select className="box col-xl-5" name="selectedClusters">
//                   <option value="" defaultValue>
//                     Payment type...
//                   </option>
//                 </select>
//               </div>
//               <div>
//                 <button className="buttons" onClick={() => handleClick()}>
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default PayFees;

import React, { useEffect, useState } from "react";
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
              <label>Search By id:</label>
              <div className="mt-3">
                <label className="col-xl-5">Student Id </label>
                <input
                  className="box col-xl-5"
                  name="student_id"
                />
              </div>
              <label className="mt-4">Search By Name:</label>
              <div className="mt-3">
                <label className="col-xl-5">Student Name </label>
                <input
                  className="box col-xl-5"
                  name="student_name"
                  
                />
              </div>
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
