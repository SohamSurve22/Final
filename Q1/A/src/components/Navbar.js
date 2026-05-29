import React from "react";

// Navbar Component
// Renders the header and handles basic page navigation
function Navbar({ currentView, setView, cart }) {
  // Add to Cart calculation to show total item count in navbar
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        {/* Brand Name - Clicking it redirects to Home */}
        <span 
          className="navbar-brand fw-bold cursor-pointer" 
          style={{ cursor: "pointer" }}
          onClick={() => setView("home")}
        >
          <i className="bi bi-egg-fried me-2 text-warning"></i>
          QuickBites
        </span>

        {/* Toggle Button for mobile responsive view */}
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

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <span
                className={`nav-link ${currentView === "home" ? "active fw-bold text-warning" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => setView("home")}
              >
                Home
              </span>
            </li>
            <li className="nav-item">
              <span
                className={`nav-link ${currentView === "cart" ? "active fw-bold text-warning" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => setView("cart")}
              >
                Cart
              </span>
            </li>
          </ul>

          {/* Cart Status Button */}
          <div className="d-flex">
            <button
              className="btn btn-outline-warning d-flex align-items-center"
              onClick={() => setView("cart")}
            >
              <i className="bi bi-cart3 me-2"></i>
              Cart
              <span className="badge bg-warning text-dark ms-2 rounded-pill">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
