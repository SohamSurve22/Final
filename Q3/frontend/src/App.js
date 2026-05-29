// Main React App Component
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ExamList from "./pages/ExamList";
import ExamInterface from "./pages/ExamInterface";
import Result from "./pages/Result";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [page, setPage] = useState(token ? "dashboard" : "login");
  const [activeExam, setActiveExam] = useState(null);
  const [lastResult, setLastResult] = useState(null);

  // Sync state with local storage changes
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

  // Handle User Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken("");
    setUsername("");
    setActiveExam(null);
    setLastResult(null);
    setPage("login");
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Navigation Header */}
      <Navbar 
        page={page} 
        setPage={setPage} 
        username={username} 
        onLogout={handleLogout} 
      />

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
        {page === "exams" && token && (
          <ExamList setPage={setPage} setActiveExam={setActiveExam} />
        )}
        {page === "exam-interface" && token && activeExam && (
          <ExamInterface 
            activeExam={activeExam} 
            setPage={setPage} 
            setLastResult={setLastResult} 
          />
        )}
        {page === "result" && token && (
          <Result lastResult={lastResult} setPage={setPage} />
        )}
      </div>
    </div>
  );
}

export default App;
