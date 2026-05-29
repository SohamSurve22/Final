import React from "react";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../api";

// Cart Page
function Cart({ user, cart, setCart }) {
  const navigate = useNavigate();

  // Remove from Cart Function
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  // Calculate total amount
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Place Order Function
  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      // Prepare order items
      const items = cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      await placeOrder({ userId: user.email, items, totalAmount });

      alert("Order placed successfully!");
      setCart([]); // Clear cart after order
      navigate("/orders");
    } catch (err) {
      alert("Could not place order");
    }
  };

  return (
    <div className="container mt-4">
      <h3>My Cart</h3>

      {cart.length === 0 ? (
        <div className="alert alert-info">
          Your cart is empty. <a href="/">Go shopping!</a>
        </div>
      ) : (
        <>
          {/* Cart Items Table */}
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price * item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total and Order Button */}
          <div className="text-end">
            <h5>Total: ₹{totalAmount}</h5>
            <button className="btn btn-dark" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
