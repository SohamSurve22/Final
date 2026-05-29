// Seeding Script
require("dotenv").config();
const mongoose = require("mongoose");
const Exam = require("./models/Exam");
const Question = require("./models/Question");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/exam_db";

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data
    await Exam.deleteMany({});
    await Question.deleteMany({});
    console.log("Cleared old exams and questions.");

    // Create Web Dev Exam
    const webExam = await Exam.create({
      title: "Web Development Practical Exam",
      duration: 3 // 3 minutes for quick test
    });

    await Question.create([
      {
        examId: webExam._id,
        question: "What does HTML stand for?",
        optionA: "Hyper Text Markup Language",
        optionB: "High Tech Markup Language",
        optionC: "Hyper Tabular Markup Language",
        optionD: "None of the above",
        correctAnswer: "A"
      },
      {
        examId: webExam._id,
        question: "Which of the following is a NoSQL database?",
        optionA: "MySQL",
        optionB: "PostgreSQL",
        optionC: "MongoDB",
        optionD: "Oracle",
        correctAnswer: "C"
      },
      {
        examId: webExam._id,
        question: "What does CSS stand for?",
        optionA: "Creative Style Sheets",
        optionB: "Cascading Style Sheets",
        optionC: "Computer Style Sheets",
        optionD: "Colorful Style Sheets",
        correctAnswer: "B"
      }
    ]);

    // Create DBMS Exam
    const dbmsExam = await Exam.create({
      title: "Database Management Systems (DBMS) Viva",
      duration: 5 // 5 minutes
    });

    await Question.create([
      {
        examId: dbmsExam._id,
        question: "Which SQL clause is used to filter records?",
        optionA: "WHERE",
        optionB: "ORDER BY",
        optionC: "GROUP BY",
        optionD: "SELECT",
        correctAnswer: "A"
      },
      {
        examId: dbmsExam._id,
        question: "Which key uniquely identifies a row in a table?",
        optionA: "Foreign Key",
        optionB: "Primary Key",
        optionC: "Secondary Key",
        optionD: "Super Key",
        correctAnswer: "B"
      },
      {
        examId: dbmsExam._id,
        question: "What is an ER Diagram in DBMS?",
        optionA: "Entity Relationship Diagram",
        optionB: "Entity Registry Diagram",
        optionC: "Element Ratio Diagram",
        optionD: "None of the above",
        correctAnswer: "A"
      }
    ]);

    console.log("Database seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedData();
