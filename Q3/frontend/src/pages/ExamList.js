// Exam List Page Component
import React, { useState, useEffect } from "react";
import API from "../api";

function ExamList({ setPage, setActiveExam }) {
  const [exams, setExams] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await API.get("/exams");
        setExams(response.data);
      } catch (err) {
        setError("Failed to fetch available exams.");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const handleStartExam = (exam) => {
    const confirmStart = window.confirm(`Are you sure you want to start "${exam.title}"? The timer will start immediately.`);
    if (confirmStart) {
      setActiveExam(exam);
      setPage("exam-interface");
    }
  };

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col">
          <h2>Available Practical Examinations</h2>
          <p className="text-muted">Select an exam below and click "Start Exam" to open the examination screen.</p>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : exams.length > 0 ? (
        <div className="row g-4">
          {exams.map((exam) => (
            <div className="col-md-6 col-lg-4" key={exam._id}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-dark mb-3">{exam.title}</h5>
                  <div className="mb-4">
                    <span className="badge bg-warning text-dark me-2">MCQ Format</span>
                    <span className="badge bg-info text-white">{exam.duration} Minutes</span>
                  </div>
                  <div className="mt-auto">
                    <button 
                      className="btn btn-primary w-100 fw-bold"
                      onClick={() => handleStartExam(exam)}
                    >
                      Start Exam
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 text-muted bg-white rounded shadow-sm">
          <p className="mb-0">No active exams are available right now.</p>
          <small>Check back later or contact your examiner.</small>
        </div>
      )}
    </div>
  );
}

export default ExamList;
