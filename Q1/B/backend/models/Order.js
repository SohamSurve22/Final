const mongoose = require("mongoose");

// Order Schema
const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },  // store user email for simplicity
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "Placed" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
