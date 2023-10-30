import React from 'react';
import Backbutton from '../../component/backbutton';
import Navbar from '../Common/Navbar';
import '../Expenses/expenses.css'

const Expenses = () => {
   
  return (

    <div>
        <Navbar/>
       <Backbutton/>
       <div className='expense'>
        <form action="">
          <label>Date :</label>
          <input type='date' name='date'/>
          <label>Reason :</label>
          <input type='text' name='reason'/>
          <label>Amount :</label>
          <input type='number' name='amount'/>
          <button className='button' type='submit'>Submit</button>
        </form>
       </div>
    </div>
  )
}

export default Expenses;
