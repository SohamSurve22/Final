const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import Routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);      // Register and Login
app.use("/api/products", productRoutes); // Product APIs
app.use("/api/orders", orderRoutes);   // Order APIs

// Health check
app.get("/", (req, res) => res.send("Shopping API is running"));

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log("Server running on port", port));
  })
  .catch((err) => {
    console.log("DB connection error:", err.message);
  });
