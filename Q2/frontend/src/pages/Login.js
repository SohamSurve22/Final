// Login Page
import React, { useState } from "react";
import API from "../api";

function Login({ setToken, setUsername, setPage }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Auto-fill demo credentials
  const fillDemo = () => {
    setFormData({ username: "demo", password: "demo123" });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await API.post("/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      setToken(response.data.token);
      setUsername(response.data.username);
      setPage("dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Username or Password");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white text-center py-3">
              <h3 className="mb-0">Teacher Login</h3>
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
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Enter Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2">
                  Login
                </button>
              </form>
              <div className="text-center mt-3">
                <p className="mb-0">
                  Don't have an account?{" "}
                  <button className="btn btn-link p-0 text-decoration-none" onClick={() => setPage("register")}>
                    Register here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
