import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../api";

// Add Product Page
function AddProduct({ user }) {
  const navigate = useNavigate();

  // Add Product form state
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Add Product Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    try {
      await addProduct({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      alert("Product added successfully!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Could not add product");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-dark text-white">
              <h4>Add New Product</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter product name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    placeholder="Enter description"
                    value={form.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    placeholder="Enter price"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Category</label>
                  <input
                    type="text"
                    name="category"
                    className="form-control"
                    placeholder="e.g. Electronics, Clothing"
                    value={form.category}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    className="form-control"
                    placeholder="Enter stock quantity"
                    value={form.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-dark w-100">
                  Add Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
