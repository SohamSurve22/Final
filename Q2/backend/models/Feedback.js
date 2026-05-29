// Feedback Schema
const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
