import { Link } from "react-router-dom"


const Navbar = ()=>{

    return(

        <nav className="navbar shadow navbar-expand-lg navbar-light bg-light p-3 ">
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
                <Link className="nav-link mx-2" to="/coursefee" activeClassName="active">
                  <i className="bi bi-people"></i>&nbsp;Fees
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-2" to="/payfee" activeClassName="active">
                  <i className="bi bi-cash"></i>&nbsp;Transaction
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-2" to="/" activeClassName="active">
                  <i className="bi bi-bank"></i>&nbsp;Accounts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-2" to="/" activeClassName="active">
                <i class="bi bi-flag-fill"></i>&nbsp;Report
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
                      Report
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
      
    )




}

export default Navbar;