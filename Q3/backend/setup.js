const mongoose = require("mongoose");
require("dotenv").config();

async function setup() {
  try {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/exam_db";
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected successfully for setup");

    // Load models
    require("./models/User");
    require("./models/Exam");
    require("./models/Question");
    require("./models/Result");

    const db = mongoose.connection.db;
    await db.listCollections().toArray(); // triggers db creation if needed

    console.log("Database & Collections Setup Ready!");
    process.exit(0);
  } catch (err) {
    console.log("Setup failed:", err.message);
    process.exit(1);
  }
}

setup();
