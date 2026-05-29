import React from "react";

// Food Card Component
// Displays single food item card with details and Add to Cart action
function FoodCard({ food, addToCart }) {
  const { name, price, image, rating, category, description } = food;

  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div className="card h-100 shadow-sm border-1">
        {/* Food Image */}
        <img
          src={image}
          className="card-img-top"
          alt={name}
          style={{ height: "180px", objectFit: "cover" }}
        />
        
        {/* Card Body */}
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-2">
            {/* Category Badge */}
            <span className="badge bg-secondary text-white font-monospace">{category}</span>
            {/* Rating Stars */}
            <span className="text-warning small fw-bold">
              <i className="bi bi-star-fill me-1"></i>
              {rating}
            </span>
          </div>

          <h5 className="card-title fw-bold text-dark">{name}</h5>
          <p className="card-text text-muted flex-grow-1 small">{description}</p>
          
          <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
            {/* Price tag */}
            <span className="fs-5 fw-bold text-success">₹{price}</span>
            {/* Add to Cart Button */}
            <button
              className="btn btn-primary btn-sm d-flex align-items-center"
              onClick={() => addToCart(food)}
            >
              <i className="bi bi-plus-circle me-1"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
