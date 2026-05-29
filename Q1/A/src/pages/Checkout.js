import React, { useState } from "react";

// Checkout Page Component
// Renders the delivery form and handles validation & submission of orders
function Checkout({ cart, placeOrder, setView }) {
  // Local state for delivery form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery"
  });

  // Calculate order totals
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryCharges = subtotal > 500 ? 0 : 40;
  const grandTotal = subtotal + deliveryCharges;

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission and validation
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple frontend phone number validation (10 digits)
    if (formData.phone.length !== 10 || isNaN(formData.phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Call the parent order placement function
    placeOrder({
      customer: formData,
      items: cart,
      totalAmount: grandTotal
    });
  };

  return (
    <div className="container px-0">
      <h2 className="mb-4 fw-bold text-dark">
        <i className="bi bi-credit-card me-2"></i> Checkout
      </h2>

      <div className="row">
        {/* Left Side: Delivery Details Form */}
        <div className="col-md-7 mb-4">
          <div className="card shadow-sm border-1 p-4 rounded-3 bg-white">
            <h4 className="fw-bold mb-4 text-dark pb-2 border-bottom">Delivery Address</h4>
            
            <form onSubmit={handleSubmit}>
              {/* Full Name Input */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="row">
                {/* Email Input */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    required
                  />
                </div>
                {/* Phone Input */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="phone" className="form-label fw-semibold">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    maxLength="10"
                    required
                  />
                </div>
              </div>

              {/* Address Input */}
              <div className="mb-3">
                <label htmlFor="address" className="form-label fw-semibold">Full Delivery Address</label>
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  rows="3"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your complete home/flat address"
                  required
                ></textarea>
              </div>

              {/* Payment Method */}
              <div className="mb-4">
                <label className="form-label fw-semibold d-block">Payment Method</label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="cod"
                    value="Cash on Delivery"
                    checked={formData.paymentMethod === "Cash on Delivery"}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="cod">
                    Cash on Delivery (COD)
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="card"
                    value="Credit/Debit Card"
                    checked={formData.paymentMethod === "Credit/Debit Card"}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="card">
                    Online Card Payment
                  </label>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="d-flex justify-content-between pt-3 border-top">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4"
                  onClick={() => setView("cart")}
                >
                  <i className="bi bi-arrow-left me-1"></i> Back to Cart
                </button>
                <button
                  type="submit"
                  className="btn btn-success px-5 fw-bold"
                >
                  Place Order (₹{grandTotal})
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: Order Summary Review */}
        <div className="col-md-5">
          <div className="card shadow-sm border-1 p-3 rounded-3 bg-light">
            <h4 className="fw-bold mb-3 text-dark">Order Items ({cart.length})</h4>
            <div style={{ maxExpandedHeight: "300px", overflowY: "auto" }}>
              {cart.map((item) => (
                <div key={item.id} className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                  <div>
                    <h6 className="my-0 fw-bold">{item.name}</h6>
                    <small className="text-muted">Quantity: {item.quantity} x ₹{item.price}</small>
                  </div>
                  <span className="text-muted fw-semibold">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Delivery</span>
                <span>
                  {deliveryCharges === 0 ? <strong className="text-success">FREE</strong> : `₹${deliveryCharges}`}
                </span>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center mt-2">
                <span className="fs-5 fw-bold">Grand Total</span>
                <span className="fs-4 fw-bold text-success">₹{grandTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
