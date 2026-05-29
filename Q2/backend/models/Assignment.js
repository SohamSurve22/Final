// Assignment Schema
const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    submissionDate: { type: String, required: true },
    status: { type: String, default: "Pending" }, // Pending / Submitted / Graded
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assignment", AssignmentSchema);
