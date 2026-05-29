const mongoose = require("mongoose");
require("dotenv").config();

// QUICK EDIT FOR EXAM:
// - Change MONGO_URI in .env if needed
// - Run: node setup.js

async function setup() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");

    // Load all models to create collections
    require("./models/User");
    require("./models/Product");
    require("./models/Order");

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    console.log("Collections in DB:");
    collections.forEach((col) => console.log(" -", col.name));

    console.log("Database setup complete!");
    process.exit(0);
  } catch (err) {
    console.log("Setup failed:", err.message);
    process.exit(1);
  }
}

setup();
