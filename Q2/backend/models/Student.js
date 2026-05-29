// Student Schema
const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true },
    subject: { type: String, required: true },
    marks: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
