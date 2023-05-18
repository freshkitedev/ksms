import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="container">
      <br></br>
      <nav className="navbar shadow navbar-expand-lg navbar-light bg-light p-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <h2 style={{ fontFamily: 'cursive' }}>
              <b>
                <i className="bi bi-alexa"></i>&nbsp;Ksms
              </b>
            </h2>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link mx-2" to="/" activeClassName="active">
                  <i className="bi bi-house"></i>&nbsp;Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-2" to="/" activeClassName="active">
                  <i className="bi bi-people"></i>&nbsp;School
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-2" to="/" activeClassName="active">
                  <i className="bi bi-bank"></i>&nbsp;Fees
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link mx-2 dropdown-toggle"
                  to="/"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  About <i className="bi bi-three-dots-vertical"></i>
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link className="dropdown-item" to="/">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      Contact us
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto d-none d-lg-inline-flex">
              <div className="btn btn-outline-dark">
                <i className="bi bi-r-circle"></i>&nbsp;Register
              </div>
              <li className="nav-item mx-2">
                <Link className="nav-link text-dark h5" to="" target="blank">
                  <i className="bi bi-google"></i>
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link text-dark h5" to="" target="blank">
                  <i className="bi bi-twitter"></i>
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link text-dark h5" to="" target="blank">
                  <i className="bi bi-facebook"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="wrapper shadow">
        <div className="logo">
          <img
            src="https://th.bing.com/th?id=OIP.IZKBFaka6DPACOEqN-LS-gHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
            alt=""
          />
        </div>
        <div className="text-center mt-4 name" style={{ fontFamily: 'cursive' }}>
          <b>Ksms</b>
        </div>
        <form className="p-3 mt-3">
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="text" name="userName" id="userName" placeholder="Username" />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input type="password" name="password" id="pwd" placeholder="Password" />
          </div>
          <button className="btn mt-3">Login</button>
        </form>
        <div className="text-center fs-6">
          <a href="#">Forgot password?</a> or <a href="#">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
