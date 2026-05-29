// Add Assignment Function / Page
import React, { useState, useEffect } from "react";
import API from "../api";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [formData, setFormData] = useState({ title: "", submissionDate: "", status: "Pending" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchAssignments = async () => {
    try {
      const response = await API.get("/assignments");
      setAssignments(response.data);
    } catch (err) {
      setError("Failed to fetch assignments");
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await API.post("/assignments", formData);
      setSuccess("Assignment added successfully!");
      setFormData({ title: "", submissionDate: "", status: "Pending" });
      fetchAssignments();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add assignment");
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Assignments Management</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="row g-4">
        {/* Add Assignment Form */}
        <div className="col-md-4">
          <div className="card shadow border-0">
            <div className="card-header bg-success text-white py-3">
              <h5 className="mb-0">Add New Assignment</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Assignment Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Enter Assignment Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Submission Date</label>
                  <input
                    type="date"
                    name="submissionDate"
                    className="form-control"
                    value={formData.submissionDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
                    <option value="Pending">Pending</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Graded">Graded</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Create Assignment
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* View Assignments list */}
        <div className="col-md-8">
          <div className="card shadow border-0">
            <div className="card-header bg-light py-3">
              <h5 className="mb-0">Assignments List</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Title</th>
                      <th>Submission Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignments.length > 0 ? (
                      assignments.map((assignment) => (
                        <tr key={assignment._id}>
                          <td>{assignment.title}</td>
                          <td>{assignment.submissionDate}</td>
                          <td>
                            <span
                              className={`badge ${
                                assignment.status === "Graded"
                                  ? "bg-info"
                                  : assignment.status === "Submitted"
                                  ? "bg-success"
                                  : "bg-warning text-dark"
                              }`}
                            >
                              {assignment.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center py-3">
                          No assignments created yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assignments;
