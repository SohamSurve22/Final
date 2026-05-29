// Dashboard Component
import React, { useEffect, useState } from "react";
import API from "../api";

function Dashboard({ setPage }) {
  const [stats, setStats] = useState({
    students: 0,
    assignments: 0,
    feedbacks: 0,
    averageMarks: 0,
  });
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      const response = await API.get("/stats");
      setStats(response.data);
    } catch (err) {
      setError("Failed to fetch dashboard statistics");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard Overview</h2>
        <button className="btn btn-primary btn-sm" onClick={fetchStats}>
          🔄 Refresh
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4">
        {/* Total Students Card */}
        <div className="col-md-3">
          <div className="card text-white bg-primary h-100 shadow border-0">
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title text-uppercase text-white-50">Students</h5>
                <h2 className="display-4 fw-bold">{stats.students}</h2>
              </div>
              <button className="btn btn-light btn-sm mt-3 w-100" onClick={() => setPage("students")}>
                View Records
              </button>
            </div>
          </div>
        </div>

        {/* Total Assignments Card */}
        <div className="col-md-3">
          <div className="card text-white bg-success h-100 shadow border-0">
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title text-uppercase text-white-50">Assignments</h5>
                <h2 className="display-4 fw-bold">{stats.assignments}</h2>
              </div>
              <button className="btn btn-light btn-sm mt-3 w-100" onClick={() => setPage("assignments")}>
                Manage Assignments
              </button>
            </div>
          </div>
        </div>

        {/* Feedbacks Received Card */}
        <div className="col-md-3">
          <div className="card text-white bg-warning h-100 shadow border-0">
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title text-uppercase text-white-50">Feedback Messages</h5>
                <h2 className="display-4 fw-bold">{stats.feedbacks}</h2>
              </div>
              <button className="btn btn-light btn-sm mt-3 w-100" onClick={() => setPage("feedback")}>
                View Feedback
              </button>
            </div>
          </div>
        </div>

        {/* Average Class Score Card */}
        <div className="col-md-3">
          <div className="card text-white bg-info h-100 shadow border-0">
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title text-uppercase text-white-50">Class Average</h5>
                <h2 className="display-4 fw-bold">{stats.averageMarks || 0}%</h2>
              </div>
              <button className="btn btn-light btn-sm mt-3 w-100" onClick={() => setPage("students")}>
                Analyze Marks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
