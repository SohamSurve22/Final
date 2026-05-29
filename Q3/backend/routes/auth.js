// Register & Login API
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// JWT Secret Key from .env
const JWT_SECRET = process.env.JWT_SECRET || "exam_secret_key_123";

// Student Registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Simple Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "Registered successfully! Please login." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Student Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Simple Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // ── Hardcoded Demo User ──────────────────────────────────────────────
    if (email === "demo" && password === "demo123") {
      const token = jwt.sign(
        { id: "demo_user", name: "Demo User" },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.json({
        token,
        user: { id: "demo_user", name: "Demo User", email: "demo" }
      });
    }
    // ────────────────────────────────────────────────────────────────────

    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, name: user.name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
