// Student Records Page
import React, { useState, useEffect } from "react";
import API from "../api";

function Students() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: "", rollNo: "", subject: "", marks: "" });
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "", rollNo: "", subject: "", marks: "" });
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [subjects, setSubjects] = useState([]); // List of unique subjects for filter dropdown
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get Students API call
  const fetchStudents = async () => {
    try {
      const response = await API.get(`/students?search=${search}&subject=${subjectFilter}`);
      setStudents(response.data);

      // Collect unique subjects for filtering
      if (!subjectFilter && !search) {
        const uniqueSubjects = [...new Set(response.data.map((s) => s.subject))];
        setSubjects(uniqueSubjects);
      }
    } catch (err) {
      setError("Failed to fetch students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search, subjectFilter]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  // Add Student API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await API.post("/students", formData);
      setSuccess("Student record added successfully!");
      setFormData({ name: "", rollNo: "", subject: "", marks: "" });
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add student");
    }
  };

  // Update Student API call
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await API.put(`/students/${editId}`, editFormData);
      setSuccess("Student record updated successfully!");
      setEditId(null);
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update student");
    }
  };

  // Delete Student API call
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    setError("");
    setSuccess("");
    try {
      await API.delete(`/students/${id}`);
      setSuccess("Student record deleted successfully!");
      fetchStudents();
    } catch (err) {
      setError("Failed to delete student record");
    }
  };

  const startEdit = (student) => {
    setEditId(student._id);
    setEditFormData({
      name: student.name,
      rollNo: student.rollNo,
      subject: student.subject,
      marks: student.marks,
    });
  };

  return (
    <div className="container">
      <h2 className="mb-4">Student Records</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="row g-4">
        {/* Add Student Record Form */}
        <div className="col-md-4">
          <div className="card shadow border-0 mb-4">
            <div className="card-header bg-primary text-white py-3">
              <h5 className="mb-0">Add Student Record</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter Student Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Roll Number</label>
                  <input
                    type="text"
                    name="rollNo"
                    className="form-control"
                    placeholder="Enter Roll No"
                    value={formData.rollNo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="e.g. Mathematics"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Marks</label>
                  <input
                    type="number"
                    name="marks"
                    className="form-control"
                    placeholder="Out of 100"
                    min="0"
                    max="100"
                    value={formData.marks}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Add Student
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* View / Search / Filter Table */}
        <div className="col-md-8">
          <div className="card shadow border-0">
            <div className="card-header bg-light py-3">
              <h5 className="mb-0">Student list</h5>
            </div>
            <div className="card-body">
              {/* Search Filter Function */}
              <div className="row g-2 mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="🔍 Search student by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    value={subjectFilter}
                    onChange={(e) => setSubjectFilter(e.target.value)}
                  >
                    <option value="">All Subjects</option>
                    {subjects.map((sub, i) => (
                      <option key={i} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {editId ? (
                /* Edit Student Form */
                <div className="p-3 border rounded bg-light mb-4">
                  <h6>Edit Student Record</h6>
                  <form onSubmit={handleUpdate} className="row g-2">
                    <div className="col-md-3">
                      <input
                        type="text"
                        name="name"
                        className="form-control form-control-sm"
                        placeholder="Name"
                        value={editFormData.name}
                        onChange={handleEditInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <input
                        type="text"
                        name="rollNo"
                        className="form-control form-control-sm"
                        placeholder="Roll No"
                        value={editFormData.rollNo}
                        onChange={handleEditInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <input
                        type="text"
                        name="subject"
                        className="form-control form-control-sm"
                        placeholder="Subject"
                        value={editFormData.subject}
                        onChange={handleEditInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-2">
                      <input
                        type="number"
                        name="marks"
                        className="form-control form-control-sm"
                        placeholder="Marks"
                        value={editFormData.marks}
                        onChange={handleEditInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-12 d-flex gap-2 justify-content-end mt-2">
                      <button type="submit" className="btn btn-success btn-sm">
                        Save
                      </button>
                      <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditId(null)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : null}

              {/* Student Marks Table */}
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Roll No</th>
                      <th>Name</th>
                      <th>Subject</th>
                      <th>Marks</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.length > 0 ? (
                      students.map((student) => (
                        <tr key={student._id}>
                          <td>{student.rollNo}</td>
                          <td>{student.name}</td>
                          <td>{student.subject}</td>
                          <td>
                            <span className={`badge ${student.marks >= 40 ? "bg-success" : "bg-danger"}`}>
                              {student.marks}
                            </span>
                          </td>
                          <td className="text-center">
                            <button className="btn btn-warning btn-sm me-2" onClick={() => startEdit(student)}>
                              ✏️ Edit
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student._id)}>
                              🗑️ Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-3">
                          No student records found.
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

export default Students;
