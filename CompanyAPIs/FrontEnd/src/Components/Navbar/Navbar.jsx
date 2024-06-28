import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "./../../Context/AuthContext";
import "./Navbar.css";

export const Navbar = () => {
  const { userToken, setUserToken } = useContext(authContext);

  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/");
  }

  return (
    <nav
      className="navbar navbar-expand-lg  py-3  fixed-top"
    >
      <div className="container">
        <Link
          to="/"
          className="nav-link  fs-3 text-uppercase"
          aria-current="page"
        >
          speedylogistics
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/about" className="nav-link " aria-current="page">
                About
              </Link>
            </li> */}
            {userToken ? (
              <>
                {localStorage.getItem("userRole") === "EMPLOYEE" && (
                  <li className="nav-item">
                    <Link
                      to="/operation"
                      className="nav-link "
                      aria-current="page"
                    >
                      Operations
                    </Link>
                  </li>
                )}
                {localStorage.getItem("userRole") === "user" && (
                  <li className="nav-item">
                    <Link
                      to="/userOperations"
                      className="nav-link "
                      aria-current="page"
                    >
                      Operations
                    </Link>
                  </li>
                )}
                {localStorage.getItem("userRole") === "admin" && (
                  <li className="nav-item">
                    <Link
                      to="/report"
                      className="nav-link "
                      aria-current="page"
                    >
                      Reports
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <div class="dropdown">
                    <div
                      class=" nav-link dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="icon  text-danger">
                        <div className="text-main d-flex align-items-center justify-content-center h-100">
                          {localStorage
                            .getItem("userName")?.toLowerCase()
                            .slice(0, 1)}
                          {/* {localStorage
                            .getItem("lastName")?.toLowerCase()
                            .slice(0, 1)} */}
                        </div>
                      </span>
                      <span className="text-capitalize">
                        {" "}
                        {localStorage.getItem("userName")}{" "}
                        {/* {localStorage.getItem("lastName")} */}
                      </span>
                    </div>
                    <ul class="dropdown-menu">
                      <li>
                        <Link
                          to="/profile"
                          className="dropdown-item"
                          aria-current="page"
                        >
                          My profile
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <span
                          className=" cursor-pointer dropdown-item"
                          onClick={() => {
                            logOut();
                          }}
                          aria-current="page"
                          style={{ cursor: "pointer" }}
                        >
                          LogOut
                        </span>
                      </li>
                    </ul>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/loginforuser"
                    className="nav-link "
                    aria-current="page"
                  >
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/loginforEmployee"
                    className="nav-link "
                    aria-current="page"
                  >
                    Employees
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link to={"signup"} className="nav-link">
                    Register
                  </Link>
                </li> */}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
