const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Get All Products API
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;

    let products;

    // Search Product by name or category
    if (search) {
      products = await Product.find({
        $or: [
          { name: new RegExp(search, "i") },
          { category: new RegExp(search, "i") },
        ],
      });
    } else {
      products = await Product.find().sort({ createdAt: -1 });
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch products" });
  }
});

// Get Single Product API
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch product" });
  }
});

// Add Product API
router.post("/", async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const product = await Product.create({ name, description, price, category, stock });
    res.json({ message: "Product added", product });
  } catch (err) {
    res.status(400).json({ message: "Could not add product", error: err.message });
  }
});

module.exports = router;
