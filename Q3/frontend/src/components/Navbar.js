// Navigation Bar Component
import React from "react";

function Navbar({ page, setPage, username, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <span 
          className="navbar-brand fw-bold" 
          style={{ cursor: "pointer" }} 
          onClick={() => username ? setPage("dashboard") : setPage("login")}
        >
          Online Exam Portal
        </span>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {username ? (
              <>
                <li className="nav-item">
                  <button 
                    className={`btn nav-link ${page === "dashboard" ? "active fw-bold" : ""}`}
                    onClick={() => setPage("dashboard")}
                  >
                    Dashboard
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`btn nav-link ${page === "exams" ? "active fw-bold" : ""}`}
                    onClick={() => setPage("exams")}
                  >
                    Take Exam
                  </button>
                </li>
              </>
            ) : null}
          </ul>
          <div className="d-flex align-items-center">
            {username ? (
              <>
                <span className="text-white me-3">Welcome, <strong>{username}</strong></span>
                <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  className={`btn btn-sm text-white me-2 ${page === "login" ? "fw-bold underline" : ""}`}
                  onClick={() => setPage("login")}
                >
                  Login
                </button>
                <button 
                  className={`btn btn-sm btn-outline-light ${page === "register" ? "fw-bold" : ""}`}
                  onClick={() => setPage("register")}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
