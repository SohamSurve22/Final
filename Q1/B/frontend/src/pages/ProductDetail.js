import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api";

// Product Detail Page
function ProductDetail({ user, cart, setCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res.data);
      } catch (err) {
        alert("Could not fetch product");
      }
    };
    fetchProduct();
  }, [id]);

  // Add to Cart Function
  const addToCart = () => {
    if (!user) {
      alert("Please login to add to cart");
      navigate("/login");
      return;
    }

    const exists = cart.find((item) => item._id === product._id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert(product.name + " added to cart!");
  };

  if (!product) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{product.name}</h3>
          <p className="text-muted">Category: {product.category}</p>
          <hr />
          <p>{product.description}</p>
          <h5>Price: ₹{product.price}</h5>
          <p>Stock Available: {product.stock}</p>
          <button className="btn btn-dark" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
