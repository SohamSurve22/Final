// Exam & Question APIs
const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");
const Question = require("../models/Question");
const authMiddleware = require("./authMiddleware");

// Get Exams API - Fetch all exams (protected)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get Questions API - Fetch questions of specific exam (protected)
router.get("/:examId/questions", authMiddleware, async (req, res) => {
  try {
    const questions = await Question.find({ examId: req.params.examId });
    // In a student project, they might return everything including correctAnswer
    // and do result check on either frontend or backend.
    // The requirement says: Submit Exam API, Generate Result API.
    // Let's send the correct answers too, since the student would just fetch them and compare
    // or compare on the backend. Sending them is simple for a basic project.
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
