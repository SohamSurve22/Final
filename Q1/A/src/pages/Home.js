import React, { useState } from "react";
import FoodCard from "../components/FoodCard";

// Home Page Component
// Renders the banner, category filters, and food menu grid
function Home({ foodItems, addToCart }) {
  // State to track selected filter category
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories list from mock food items plus "All"
  const categories = ["All", "Main Course", "Fast Food", "Snacks", "Beverages"];

  // Filter items based on selected category state
  const filteredItems = selectedCategory === "All"
    ? foodItems
    : foodItems.filter(item => item.category === selectedCategory);

  return (
    <div>
      {/* Hero Banner / Jumbotron */}
      <div className="bg-light text-center py-5 mb-5 rounded-3 shadow-sm border">
        <div className="container py-2">
          <h1 className="display-5 fw-bold text-dark">Hungry? Order Now!</h1>
          <p className="col-md-8 mx-auto lead text-muted">
            Choose from a wide variety of fresh, delicious food items made by the best chefs in town. Fast delivery guaranteed!
          </p>
        </div>
      </div>

      {/* Category Filter Menu */}
      <div className="row mb-4 justify-content-center">
        <div className="col-auto">
          <div className="btn-group" role="group" aria-label="Food Categories">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`btn px-4 py-2 ${
                  selectedCategory === category
                    ? "btn-warning text-dark fw-bold"
                    : "btn-outline-secondary"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Food Menu Grid */}
      <div className="container px-0">
        <h3 className="mb-4 pb-2 border-bottom fw-bold text-dark">
          {selectedCategory} Menu ({filteredItems.length} items)
        </h3>
        
        {filteredItems.length > 0 ? (
          <div className="row">
            {filteredItems.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                addToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-5 text-muted">
            <i className="bi bi-search fs-1"></i>
            <p className="mt-3">No items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
