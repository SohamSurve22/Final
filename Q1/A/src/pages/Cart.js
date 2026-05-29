import React from "react";
import CartItem from "../components/CartItem";

// Cart Page Component
// Renders the list of added items, calculated total, and checkout links
function Cart({ cart, updateQuantity, removeFromCart, setView }) {
  // Cart Total Calculation
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryCharges = cartSubtotal > 500 ? 0 : 40; // Free delivery for orders above ₹500
  const grandTotal = cartSubtotal + deliveryCharges;

  // Render empty cart state
  if (cart.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="mb-4">
          <i className="bi bi-cart-x text-muted" style={{ fontSize: "5rem" }}></i>
        </div>
        <h2 className="fw-bold text-dark">Your Cart is Empty!</h2>
        <p className="text-muted col-md-6 mx-auto mb-4">
          It looks like you haven't added any food items to your cart yet. Head back to our menu and grab some delicious items!
        </p>
        <button
          className="btn btn-warning btn-lg fw-bold text-dark px-4"
          onClick={() => setView("home")}
        >
          <i className="bi bi-arrow-left me-2"></i> View Menu
        </button>
      </div>
    );
  }

  return (
    <div className="container px-0">
      <h2 className="mb-4 fw-bold text-dark">
        <i className="bi bi-cart3 me-2"></i> Shopping Cart
      </h2>

      <div className="row">
        {/* Cart Items Table */}
        <div className="col-lg-8">
          <div className="table-responsive bg-white shadow-sm rounded-3 border p-3 mb-4">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col">Food</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Subtotal</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-1 rounded-3">
            <div className="card-body">
              <h4 className="card-title fw-bold border-bottom pb-3 mb-3 text-dark">Order Summary</h4>
              
              {/* Calculations breakdown */}
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Items Subtotal</span>
                <span className="fw-bold text-dark">₹{cartSubtotal}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Delivery Charges</span>
                <span className="fw-bold text-dark">
                  {deliveryCharges === 0 ? (
                    <span className="text-success">FREE</span>
                  ) : (
                    `₹${deliveryCharges}`
                  )}
                </span>
              </div>
              
              {/* Note on Free Delivery */}
              {cartSubtotal < 500 && (
                <div className="alert alert-info py-2 small mb-3">
                  <i className="bi bi-info-circle me-1"></i> Add <strong>₹{500 - cartSubtotal}</strong> more for <strong>FREE Delivery</strong>!
                </div>
              )}

              <hr />

              {/* Grand Total */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="fs-5 fw-bold text-dark">Grand Total</span>
                <span className="fs-4 fw-bold text-success">₹{grandTotal}</span>
              </div>

              {/* Action Buttons */}
              <div className="d-grid gap-2">
                <button
                  className="btn btn-warning btn-lg fw-bold text-dark py-2"
                  onClick={() => setView("checkout")}
                >
                  Proceed to Checkout <i className="bi bi-arrow-right ms-1"></i>
                </button>
                <button
                  className="btn btn-outline-secondary py-2"
                  onClick={() => setView("home")}
                >
                  <i className="bi bi-arrow-left me-1"></i> Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
