const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");
const User = require("./models/User");
const Order = require("./models/Order");

// QUICK EDIT FOR EXAM:
// - Change product names/prices below to match your question
// - Run: node seed.js

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Clear old data
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log("Old data cleared");

    // Sample Products Data
    const products = [
      {
        name: "Samsung Galaxy S23",
        description: "Latest Samsung flagship smartphone with 128GB storage",
        price: 74999,
        category: "Electronics",
        stock: 15,
      },
      {
        name: "Apple iPhone 14",
        description: "Apple iPhone 14 with A15 Bionic chip and 256GB storage",
        price: 89999,
        category: "Electronics",
        stock: 10,
      },
      {
        name: "Sony WH-1000XM5 Headphones",
        description: "Noise cancelling wireless headphones with 30hr battery",
        price: 29999,
        category: "Electronics",
        stock: 20,
      },
      {
        name: "Nike Running Shoes",
        description: "Lightweight running shoes for men, size 8-12",
        price: 5499,
        category: "Footwear",
        stock: 50,
      },
      {
        name: "Levi's 511 Jeans",
        description: "Slim fit jeans in dark blue denim",
        price: 3499,
        category: "Clothing",
        stock: 30,
      },
      {
        name: "Prestige Rice Cooker",
        description: "3L electric rice cooker with auto keep warm",
        price: 1899,
        category: "Kitchen",
        stock: 25,
      },
      {
        name: "Harry Potter Box Set",
        description: "Complete 7-book collection by J.K. Rowling",
        price: 2199,
        category: "Books",
        stock: 40,
      },
      {
        name: "Yoga Mat",
        description: "Non-slip exercise yoga mat, 6mm thick",
        price: 799,
        category: "Sports",
        stock: 60,
      },
    ];

    const insertedProducts = await Product.insertMany(products);
    console.log("Sample Products Inserted:", insertedProducts.length);

    console.log("Seed completed successfully!");
    process.exit(0);
  } catch (err) {
    console.log("Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
