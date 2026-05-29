// Dashboard Component / Navbar
import React from "react";

function Navbar({ page, setPage, username, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4 shadow-sm">
      <div className="container">
        <span className="navbar-brand fw-bold" style={{ cursor: "pointer" }} onClick={() => setPage("dashboard")}>
          🎓 Student Monitor
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {username ? (
            <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <button
                    className={`btn nav-link ${page === "dashboard" ? "active fw-bold text-white" : ""}`}
                    onClick={() => setPage("dashboard")}
                  >
                    Dashboard
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`btn nav-link ${page === "students" ? "active fw-bold text-white" : ""}`}
                    onClick={() => setPage("students")}
                  >
                    Student Records
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`btn nav-link ${page === "assignments" ? "active fw-bold text-white" : ""}`}
                    onClick={() => setPage("assignments")}
                  >
                    Assignments
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`btn nav-link ${page === "feedback" ? "active fw-bold text-white" : ""}`}
                    onClick={() => setPage("feedback")}
                  >
                    Feedback
                  </button>
                </li>
              </ul>
              <div className="d-flex align-items-center">
                <span className="text-white me-3">Welcome, <strong>{username}</strong></span>
                <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button
                  className={`btn nav-link ${page === "login" ? "active fw-bold text-white" : ""}`}
                  onClick={() => setPage("login")}
                >
                  Login
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`btn nav-link ${page === "register" ? "active fw-bold text-white" : ""}`}
                  onClick={() => setPage("register")}
                >
                  Register
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
