// Question Schema
const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true
  },
  question: {
    type: String,
    required: true
  },
  optionA: {
    type: String,
    required: true
  },
  optionB: {
    type: String,
    required: true
  },
  optionC: {
    type: String,
    required: true
  },
  optionD: {
    type: String,
    required: true
  },
  correctAnswer: {
    type: String, // 'A', 'B', 'C', or 'D'
    required: true
  }
});

module.exports = mongoose.model("Question", QuestionSchema);
