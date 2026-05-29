import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Import Components
import Navbar from "./components/Navbar";

// Import Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AddProduct from "./pages/AddProduct";

function App() {
  // User state - load from localStorage if already logged in
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Cart state - stored in memory (simple approach for exam)
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      {/* Navbar shown on all pages */}
      <Navbar user={user} setUser={setUser} cart={cart} />

      <Routes>
        {/* Product Listing - Home Page */}
        <Route
          path="/"
          element={<Products user={user} cart={cart} setCart={setCart} />}
        />

        {/* Login Page */}
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* Register Page */}
        <Route path="/register" element={<Register />} />

        {/* Product Detail Page */}
        <Route
          path="/product/:id"
          element={<ProductDetail user={user} cart={cart} setCart={setCart} />}
        />

        {/* Cart Page */}
        <Route
          path="/cart"
          element={<Cart user={user} cart={cart} setCart={setCart} />}
        />

        {/* Orders Page */}
        <Route path="/orders" element={<Orders user={user} />} />

        {/* Add Product Page */}
        <Route path="/add-product" element={<AddProduct user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
