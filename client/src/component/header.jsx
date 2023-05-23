import React from 'react'
import { Outlet, Link } from "react-router-dom";

const Header = () => {
  return (
    <div className='header'>
        <div className='head1'>
            Kamatchi Shanmugam  Matriculation School 
        </div>
        <div className='head2'>
       
           
            <Link to="/payFees" className='link'>Transaction</Link>
           
        </div>
    </div>
  )
}

export default Header;
