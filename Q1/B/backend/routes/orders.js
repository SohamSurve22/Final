const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Place Order API
router.post("/", async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Create new order
    const order = await Order.create({ userId, items, totalAmount });
    res.json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ message: "Could not place order", error: err.message });
  }
});

// Get Orders by User API
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch orders" });
  }
});

module.exports = router;
