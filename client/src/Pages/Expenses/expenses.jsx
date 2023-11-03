import React, { useEffect, useState } from "react";
import Backbutton from "../../component/backbutton";
import Navbar from "../Common/Navbar";
import "../Expenses/expenses.css";
import ExpTable from "../../component/expTable";
import axios from "axios";

const Expenses = () => {
  const [Date, setDate] = useState("");
  const [Reason, setReason] = useState("");
  const [Amount, setAmount] = useState("");
  const [data, setData] = useState([]);
  const [id,setId] = useState(null);
  const[isEdit,setIsEdit] = useState(false)

  console.log(Date);

  console.log(Reason);

  const infosubmit = (event) => {
    if(!id){
      const data = {
        Date: Date,
        Reason: Reason,
        Amount: Amount,
      };
  
      axios
        .post("http://localhost:5000/api/expenses/createexpenses", data)
        .then((result) => {
          alert("Successfully Added");
        });
    }
    else{
      const data = {
        Date: Date,
        Reason: Reason,
        Amount: Amount,
        id:id
      };
  
      axios
        .put("http://localhost:5000/api/expenses/updateexpenses", data)
        .then((result) => {
          alert("Successfully Updated");
        });
    }
   
  };

  const get = () => {
    axios
      .get("http://localhost:5000/api/expenses/getexpenses")
      .then((result) => {
        console.log(result.data);
        setData(result.data);
      });
  };

  const del = (id) => {

    let options =window.confirm("Are you Sure Want to Delete?")
    if(options){

      axios
        .delete(`http://localhost:5000/api/expenses/delexpenses/${id}`)
        .then((result) => {
          get();
        });
    }
  };

  const PopulateData = (items)=>{

    setReason(items.Reason);
    setDate(items.Date);
    setAmount(items.Amount);
    setId(items._id);
    setIsEdit(true)
  }

  useEffect(() => {
    get();
  }, []);

  return (
    <div>
      <Navbar />
      <Backbutton />
      <div className="expense">
        <form onSubmit={infosubmit} autoComplete="off">
          <label>Date :</label>
          <input
            type="date"
            name="Date"
            onChange={(e) => setDate(e.target.value)}
            value={Date}
          />
          {/* <label>Reason :</label>
          <input
            type="text"
            name="Reason"
            onChange={(e) => setReason(e.target.value)}
            value={Reason}
          /> */}
          <label htmlFor="">Reason</label>
          <select
            class="custom-select"
            id="inputGroupSelect03"
            aria-label="Example select with button addon"
            value={Reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="Fuel" selected>
              Fuel
            </option>
            <option value="Miscellenious">Miscellenious</option>
            <option value="Others">Others</option>
          </select>
          <label>Amount :</label>
          <input
            type="number"
            name="Amount"
            onChange={(e) => setAmount(e.target.value)}
            value={Amount}
          />
          <button className="button" type="submit">
            {isEdit ? "Update" : "Submit"}
          </button>
        </form>
      </div>
      <div className="mt-10 ExpenseTable">
        <ExpTable data={data} delete={del} editdata = {PopulateData}/>
      </div>
    </div>
  );
};

export default Expenses;
