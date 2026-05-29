// Exam Schema
const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  }
});

module.exports = mongoose.model("Exam", ExamSchema);
