import React from "react";

// Cart Item Component
// Renders a single row in the shopping cart table
function CartItem({ item, updateQuantity, removeFromCart }) {
  const { id, name, price, quantity, image, category } = item;

  return (
    <tr className="align-middle">
      {/* Thumbnail Image */}
      <td>
        <img
          src={image}
          alt={name}
          className="rounded"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      </td>
      
      {/* Item Name & Category */}
      <td>
        <div className="fw-bold">{name}</div>
        <small className="text-muted">{category}</small>
      </td>
      
      {/* Unit Price */}
      <td>₹{price}</td>
      
      {/* Quantity Adjustment Buttons */}
      <td>
        <div className="d-flex align-items-center">
          {/* Decrement Button */}
          <button
            className="btn btn-sm btn-outline-secondary py-0 px-2"
            onClick={() => updateQuantity(id, -1)}
            disabled={quantity <= 1} // Prevent setting quantity to 0 or negative
          >
            -
          </button>
          {/* Quantity Display */}
          <span className="mx-3 fw-bold">{quantity}</span>
          {/* Increment Button */}
          <button
            className="btn btn-sm btn-outline-secondary py-0 px-2"
            onClick={() => updateQuantity(id, 1)}
          >
            +
          </button>
        </div>
      </td>
      
      {/* Subtotal (Price * Quantity) */}
      <td className="fw-bold text-dark">₹{price * quantity}</td>
      
      {/* Action Button - Remove from Cart */}
      <td>
        <button
          className="btn btn-sm btn-danger d-flex align-items-center"
          onClick={() => removeFromCart(id)}
        >
          <i className="bi bi-trash me-1"></i> Remove
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
