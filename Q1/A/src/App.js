import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import foodData from "./data/foodData";
import "./App.css";

// App Component
// Serves as the central state controller and page router
function App() {
  // State 1: List of food items (loaded from static foodData)
  const [foodItems] = useState(foodData);

  // State 2: Shopping Cart (items in cart)
  const [cart, setCart] = useState([]);

  // State 3: Current View Routing ('home', 'cart', 'checkout', 'success')
  const [currentView, setView] = useState("home");

  // State 4: Saved Order Details (for order confirmation page)
  const [orderData, setOrderData] = useState(null);

  // Add to Cart Function
  const addToCart = (item) => {
    // Check if the item is already present in the cart
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // If it exists, map through cart and increment quantity
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // If it doesn't exist, append new item with initial quantity of 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Remove from Cart Function
  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  // Increase/Decrease Quantity Function
  const updateQuantity = (itemId, amount) => {
    setCart(
      cart.map((item) => {
        if (item.id === itemId) {
          const newQty = item.quantity + amount;
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
  };

  // Place Order Function
  const placeOrder = (orderInfo) => {
    // Generate a random Order ID (example: QB-104938)
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `QB-${randomNum}`;

    // Set the complete order confirmation details
    setOrderData({
      ...orderInfo,
      orderId: orderId
    });

    // Navigate to the Success confirmation page
    setView("success");
  };

  // Reset Application State (after clicking Back to Home on Success page)
  const resetApp = () => {
    setCart([]);
    setOrderData(null);
    setView("home");
  };

  // Conditional Rendering Logic (acts as the simple frontend page router)
  const renderView = () => {
    switch (currentView) {
      case "home":
        return <Home foodItems={foodItems} addToCart={addToCart} />;
      case "cart":
        return (
          <Cart
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            setView={setView}
          />
        );
      case "checkout":
        return (
          <Checkout
            cart={cart}
            placeOrder={placeOrder}
            setView={setView}
          />
        );
      case "success":
        return <Success orderData={orderData} resetApp={resetApp} />;
      default:
        return <Home foodItems={foodItems} addToCart={addToCart} />;
    }
  };

  return (
    <div className="App d-flex flex-column min-vh-100 bg-light text-dark">
      {/* Shared Navbar Header */}
      <Navbar currentView={currentView} setView={setView} cart={cart} />

      {/* Main Container for dynamic Page Content */}
      <main className="container my-5 flex-grow-1">
        {renderView()}
      </main>

      {/* Shared Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto border-top border-secondary">
        <div className="container">
          <p className="mb-1">&copy; 2026 QuickBites. All rights reserved.</p>
          <small className="text-muted">
            FSD Practical Exam Submission | Mumbai University
          </small>
        </div>
      </footer>
    </div>
  );
}

export default App;
