import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import DishesCard from "../layouts/DishesCard";

const Menu = ({ menu = [], restaurantId }) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleAddToCart = (dish) => {
    dispatch(
      addToCart({
        ...dish,
        restaurantId,
        quantity: 1,
      })
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Get unique categories
  const categories = ["all", ...new Set(menu.map((item) => item.category))];

  // Filter menu items by selected category
  const filteredMenu =
    selectedCategory === "all"
      ? menu
      : menu.filter((item) => item.category === selectedCategory);

  if (menu.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <p className="text-gray-600">No menu items available</p>
        <p className="text-gray-500 text-sm">
          Check back later for new menu items
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category === "all" ? "All Items" : category}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      {filteredMenu.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <p className="text-gray-600">No items in this category</p>
          <p className="text-gray-500 text-sm">
            Try selecting a different category
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map((item) => (
            <DishesCard
              key={item._id}
              dish={item}
              onAddToCart={() => handleAddToCart(item)}
              formatCurrency={formatCurrency}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
