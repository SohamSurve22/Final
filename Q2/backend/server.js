// Express Server Setup
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Import Models
const User = require("./models/User");
const Student = require("./models/Student");
const Assignment = require("./models/Assignment");
const Feedback = require("./models/Feedback");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected Successfully");
}

// Simple JWT Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// ==========================================
// AUTHENTICATION APIs
// ==========================================

// Register API
app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

// Login API
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // ── Hardcoded Demo User ──────────────────────────────────────────────
    if (username === "demo" && password === "demo123") {
      const token = jwt.sign({ id: "demo_user" }, process.env.JWT_SECRET || "demo_secret", {
        expiresIn: "1h",
      });
      return res.json({ token, username: "demo" });
    }
    // ────────────────────────────────────────────────────────────────────

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// ==========================================
// STUDENT APIs
// ==========================================

// Add Student API
app.post("/api/students", authMiddleware, async (req, res) => {
  try {
    const { name, rollNo, subject, marks } = req.body;
    if (!name || !rollNo || !subject || marks === undefined) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // Check duplicate rollNo
    const existingStudent = await Student.findOne({ rollNo });
    if (existingStudent) {
      return res.status(400).json({ message: "Student with this Roll No already exists" });
    }

    const student = await Student.create({
      name,
      rollNo,
      subject,
      marks: Number(marks),
    });

    res.json(student);
  } catch (err) {
    res.status(400).json({ message: "Could not add student", error: err.message });
  }
});

// Get Students API (with search and subject filter)
app.get("/api/students", authMiddleware, async (req, res) => {
  try {
    const { search = "", subject = "" } = req.query;
    
    // Search Filter Function
    let query = {};
    if (search) {
      query.name = new RegExp(search.trim(), "i");
    }
    if (subject) {
      query.subject = new RegExp(subject.trim(), "i");
    }

    const students = await Student.find(query).sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch students" });
  }
});

// Update Student API
app.put("/api/students/:id", authMiddleware, async (req, res) => {
  try {
    const { name, rollNo, subject, marks } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, rollNo, subject, marks: Number(marks) },
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: "Could not update student", error: err.message });
  }
});

// Delete Student API
app.delete("/api/students/:id", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student record deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete student" });
  }
});

// ==========================================
// ASSIGNMENT APIs
// ==========================================

// Add Assignment API
app.post("/api/assignments", authMiddleware, async (req, res) => {
  try {
    const { title, submissionDate, status } = req.body;
    if (!title || !submissionDate) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const assignment = await Assignment.create({
      title,
      submissionDate,
      status: status || "Pending",
    });

    res.json(assignment);
  } catch (err) {
    res.status(400).json({ message: "Could not add assignment", error: err.message });
  }
});

// Get Assignments API
app.get("/api/assignments", authMiddleware, async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch assignments" });
  }
});

// ==========================================
// FEEDBACK APIs
// ==========================================

// Add Feedback API
app.post("/api/feedback", authMiddleware, async (req, res) => {
  try {
    const { studentName, message } = req.body;
    if (!studentName || !message) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const feedback = await Feedback.create({
      studentName,
      message,
    });

    res.json(feedback);
  } catch (err) {
    res.status(400).json({ message: "Could not add feedback", error: err.message });
  }
});

// Get Feedback API
app.get("/api/feedback", authMiddleware, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch feedback" });
  }
});

// Dashboard Stats API
app.get("/api/stats", authMiddleware, async (req, res) => {
  try {
    const studentCount = await Student.countDocuments();
    const assignmentCount = await Assignment.countDocuments();
    const feedbackCount = await Feedback.countDocuments();
    
    // Calculate simple average marks
    const students = await Student.find();
    let averageMarks = 0;
    if (students.length > 0) {
      const totalMarks = students.reduce((acc, st) => acc + st.marks, 0);
      averageMarks = (totalMarks / students.length).toFixed(2);
    }

    res.json({
      students: studentCount,
      assignments: assignmentCount,
      feedbacks: feedbackCount,
      averageMarks,
    });
  } catch (err) {
    res.status(500).json({ message: "Could not fetch stats" });
  }
});

// Root check API
app.get("/", (req, res) => res.send("Student Performance API Running"));

// Start server
connectDB()
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log("Server running on port", port));
  })
  .catch((err) => {
    console.log("Database connection failed:", err.message);
  });
