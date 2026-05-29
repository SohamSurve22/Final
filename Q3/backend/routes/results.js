// Submit Exam & Get Results APIs
const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");
const Question = require("../models/Question");
const Result = require("../models/Result");
const authMiddleware = require("./authMiddleware");

// Submit Exam & Auto Generate Result API
router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const { examId, answers } = req.body; // answers is an object: { questionId: selectedOption }
    const studentName = req.user.name;

    if (!examId || !answers) {
      return res.status(400).json({ message: "Exam ID and answers are required" });
    }

    // Find the exam
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // Find all questions for this exam
    const questions = await Question.find({ examId });
    let score = 0;
    const totalQuestions = questions.length;

    // Result Calculation Logic
    questions.forEach((q) => {
      const selectedOption = answers[q._id];
      if (selectedOption && selectedOption === q.correctAnswer) {
        score += 1; // 1 mark per correct answer, no negative marking
      }
    });

    // Save to database
    const newResult = new Result({
      studentName,
      examTitle: exam.title,
      score,
      totalQuestions
    });

    await newResult.save();

    res.status(201).json({
      message: "Exam submitted successfully!",
      result: newResult
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get Results API - Fetch all past results of the logged in student
router.get("/my-results", authMiddleware, async (req, res) => {
  try {
    const studentName = req.user.name;
    const results = await Result.find({ studentName }).sort({ date: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
