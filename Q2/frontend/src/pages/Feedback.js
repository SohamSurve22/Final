// Add Feedback Function / Page
import React, { useState, useEffect } from "react";
import API from "../api";

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({ studentName: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchFeedbacks = async () => {
    try {
      const response = await API.get("/feedback");
      setFeedbacks(response.data);
    } catch (err) {
      setError("Failed to fetch feedback logs");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await API.post("/feedback", formData);
      setSuccess("Feedback submitted successfully!");
      setFormData({ studentName: "", message: "" });
      fetchFeedbacks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit feedback");
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Student Feedback Log</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="row g-4">
        {/* Submit Feedback Form */}
        <div className="col-md-4">
          <div className="card shadow border-0">
            <div className="card-header bg-warning text-dark py-3">
              <h5 className="mb-0">Add Feedback</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Student Name</label>
                  <input
                    type="text"
                    name="studentName"
                    className="form-control"
                    placeholder="Enter Student Name"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Feedback Message / Remarks</label>
                  <textarea
                    name="message"
                    rows="4"
                    className="form-control"
                    placeholder="Write performance feedback here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-warning text-dark w-100">
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* View Feedbacks */}
        <div className="col-md-8">
          <div className="card shadow border-0">
            <div className="card-header bg-light py-3">
              <h5 className="mb-0">Logged Feedback Feed</h5>
            </div>
            <div className="card-body">
              {feedbacks.length > 0 ? (
                feedbacks.map((fb) => (
                  <div key={fb._id} className="card mb-3 border-start border-warning border-3 shadow-sm">
                    <div className="card-body">
                      <h6 className="card-title fw-bold text-primary mb-1">{fb.studentName}</h6>
                      <p className="card-text text-muted mb-2">{fb.message}</p>
                      <small className="text-secondary" style={{ fontSize: "0.75rem" }}>
                        Submitted at: {new Date(fb.createdAt).toLocaleString()}
                      </small>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted py-3">No feedback logs registered yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
