// Dashboard Page Component
import React, { useState, useEffect } from "react";
import API from "../api";

function Dashboard({ setPage }) {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const username = localStorage.getItem("username") || "Student";

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await API.get("/results/my-results");
        setResults(response.data);
      } catch (err) {
        setError("Failed to fetch past exam results.");
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="container">
      {/* Header section */}
      <div className="row mb-4">
        <div className="col">
          <div className="p-4 bg-white rounded shadow-sm border-start border-primary border-4">
            <h2 className="mb-1 text-primary">Student Dashboard</h2>
            <p className="text-muted mb-0">Manage your profile, view available tests, and see your score history.</p>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Profile Card & Action Card */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-dark text-white py-3">
              <h5 className="mb-0">Profile Info</h5>
            </div>
            <div className="card-body">
              <p className="mb-2"><strong>Name:</strong> {username}</p>
              <p className="mb-0 text-muted" style={{ fontSize: "0.85rem" }}>Role: Engineering Student</p>
            </div>
          </div>

          <div className="card shadow-sm border-0 bg-primary text-white p-4">
            <h4 className="mb-2">Ready for Exam?</h4>
            <p className="mb-4 small">Check available exams assigned by the faculty and start your timed test.</p>
            <button 
              className="btn btn-light text-primary fw-bold w-100 py-2" 
              onClick={() => setPage("exams")}
            >
              View Available Exams
            </button>
          </div>
        </div>

        {/* Results History Table */}
        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-secondary text-white py-3">
              <h5 className="mb-0">Past Exam Scorecards</h5>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}

              {results.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Exam Title</th>
                        <th>Score</th>
                        <th>Percentage</th>
                        <th>Date & Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((res, index) => {
                        const pct = ((res.score / res.totalQuestions) * 100).toFixed(1);
                        return (
                          <tr key={res._id}>
                            <td>{index + 1}</td>
                            <td><strong>{res.examTitle}</strong></td>
                            <td>{res.score} / {res.totalQuestions}</td>
                            <td>
                              <span className={`badge ${pct >= 40 ? "bg-success" : "bg-danger"}`}>
                                {pct}%
                              </span>
                            </td>
                            <td>{new Date(res.date).toLocaleString()}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5 text-muted">
                  <p className="mb-0">No past exams taken yet.</p>
                  <small>Click "View Available Exams" to start your first exam.</small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
