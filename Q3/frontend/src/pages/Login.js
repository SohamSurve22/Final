// Login Page Component
import React, { useState } from "react";
import API from "../api";

function Login({ setToken, setUsername, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Auto-fill demo credentials
  const fillDemo = () => {
    setEmail("demo");
    setPassword("demo123");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Login API call
      const response = await API.post("/auth/login", { email, password });

      // Save details to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.user.name);

      // Set App states
      setToken(response.data.token);
      setUsername(response.data.user.name);

      // Redirect to Dashboard
      setPage("dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Email or Password");
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">
        <div className="card shadow-sm border-0">
          <div className="card-header bg-primary text-white text-center py-3">
            <h4 className="mb-0">Student Login</h4>
          </div>
          <div className="card-body p-4">

            {/* Demo Credentials Banner */}
            <div className="alert alert-info d-flex align-items-center justify-content-between py-2 mb-3">
              <div>
                <strong>Demo Account:</strong>&nbsp; ID: <code>demo</code> &nbsp;|&nbsp; Password: <code>demo123</code>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary ms-2"
                onClick={fillDemo}
              >
                Use Demo
              </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email / ID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter email or 'demo'"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2 mt-2">
                Login
              </button>
            </form>

            <div className="text-center mt-3">
              <span className="text-muted">New student? </span>
              <button
                className="btn btn-link p-0 align-baseline"
                onClick={() => setPage("register")}
              >
                Register Here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
