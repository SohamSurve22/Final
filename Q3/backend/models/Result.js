// Result Schema
const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  examTitle: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Result", ResultSchema);
