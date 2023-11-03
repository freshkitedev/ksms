import React from "react";

const ExpTable = (props) => {
  const del = (e) => {
    props.delete(e._id);
  };


  const edit = (items)=>{
    props.editdata(items)
  }
  return (
    <div className="container mt-5 ">
      <table class="table table-primary table-striped" >
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Date</th>
            <th scope="col">Reason</th>
            <th scope="col">Amount</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.data.length > 0 ? (
            props.data.map((items, index) => (
              <tr key={items._id}>
                <td>{index + 1}</td>
                <td>{items.Date}</td>
                <td>{items.Reason}</td>
                <td>{items.Amount}</td>
                <td>
                  <button className="btn btn-primary" onClick={()=>edit(items)}>Edit</button>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => del(items)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>No data</tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpTable;
