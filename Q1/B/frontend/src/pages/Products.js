import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api";

// Product Listing Page
function Products({ user, cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all products on load
  const fetchProducts = async (searchTerm = "") => {
    try {
      const res = await getProducts(searchTerm);
      setProducts(res.data);
    } catch (err) {
      alert("Could not fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Search Product Function
  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(search);
  };

  // Add to Cart Function
  const addToCart = (product) => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }

    // Check if item already in cart
    const exists = cart.find((item) => item._id === product._id);
    if (exists) {
      // Increase quantity
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new item with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert(product.name + " added to cart!");
  };

  return (
    <div className="container mt-4">
      <h3>All Products</h3>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="d-flex mb-4">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-dark">
          Search
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => { setSearch(""); fetchProducts(""); }}
        >
          Clear
        </button>
      </form>

      {/* Product Cards */}
      <div className="row">
        {products.length === 0 && (
          <p>No products found. <Link to="/add-product">Add one?</Link></p>
        )}
        {products.map((product) => (
          <div className="col-md-4" key={product._id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted">{product.category}</p>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>Price: ₹{product.price}</strong>
                </p>
                <p className="card-text">
                  <small>Stock: {product.stock}</small>
                </p>
                <Link
                  to={`/product/${product._id}`}
                  className="btn btn-outline-dark btn-sm me-2"
                >
                  View Details
                </Link>
                <button
                  className="btn btn-dark btn-sm"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
