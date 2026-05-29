// Dashboard Component
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Assignments from "./pages/Assignments";
import Feedback from "./pages/Feedback";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [page, setPage] = useState(token ? "dashboard" : "login");

  // Keep state sync'd with localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUsername = localStorage.getItem("username");
    if (savedToken && savedUsername) {
      setToken(savedToken);
      setUsername(savedUsername);
    } else {
      setToken("");
      setUsername("");
      if (page !== "register" && page !== "login") {
        setPage("login");
      }
    }
  }, [page]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken("");
    setUsername("");
    setPage("login");
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Bootstrap Navbar Navigation */}
      <Navbar page={page} setPage={setPage} username={username} onLogout={handleLogout} />

      <div className="container pb-5">
        {page === "login" && (
          <Login setToken={setToken} setUsername={setUsername} setPage={setPage} />
        )}
        {page === "register" && (
          <Register setPage={setPage} />
        )}
        {page === "dashboard" && token && (
          <Dashboard setPage={setPage} />
        )}
        {page === "students" && token && (
          <Students />
        )}
        {page === "assignments" && token && (
          <Assignments />
        )}
        {page === "feedback" && token && (
          <Feedback />
        )}
      </div>
    </div>
  );
}

export default App;
