// Result Page Component
import React from "react";

function Result({ lastResult, setPage }) {
  if (!lastResult) {
    return (
      <div className="text-center py-5">
        <h4>No result details found.</h4>
        <button className="btn btn-primary mt-3" onClick={() => setPage("dashboard")}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  const { examTitle, score, totalQuestions, studentName } = lastResult;
  const percentage = ((score / totalQuestions) * 100).toFixed(1);
  const isPassed = percentage >= 40.0;

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card shadow-sm border-0">
          <div className={`card-header text-white text-center py-4 ${isPassed ? "bg-success" : "bg-danger"}`}>
            <h2 className="mb-0 fw-bold">Exam Result Card</h2>
            <p className="mb-0 mt-1 small">Online Practical Examination System</p>
          </div>
          <div className="card-body p-5 text-center">
            <h4 className="text-muted mb-4">Well Done, <strong>{studentName}</strong>!</h4>
            
            <p className="lead mb-2">You completed the exam:</p>
            <h3 className="text-dark fw-bold mb-4">{examTitle}</h3>

            <div className="p-4 bg-light rounded-3 mb-4 d-inline-block w-100">
              <div className="row">
                <div className="col-6 border-end">
                  <span className="text-muted small d-block">YOUR SCORE</span>
                  <strong className="fs-2 text-primary">{score}</strong>
                  <span className="text-muted"> / {totalQuestions}</span>
                </div>
                <div className="col-6">
                  <span className="text-muted small d-block">PERCENTAGE</span>
                  <strong className="fs-2 text-primary">{percentage}%</strong>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <span className={`badge px-4 py-2 fs-6 rounded-pill ${isPassed ? "bg-success-subtle text-success border border-success" : "bg-danger-subtle text-danger border border-danger"}`}>
                Result Status: {isPassed ? "PASSED" : "FAILED"}
              </span>
            </div>

            <button 
              className="btn btn-primary btn-lg w-100 py-3 fw-bold"
              onClick={() => setPage("dashboard")}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
