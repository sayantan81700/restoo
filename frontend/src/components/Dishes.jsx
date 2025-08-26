import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import DishesCard from "../layouts/DishesCard";

const Dishes = ({ dishes = [], restaurantId }) => {
  const dispatch = useDispatch();

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

  if (dishes.length === 0) {
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
        <p className="text-gray-600">No dishes available</p>
        <p className="text-gray-500 text-sm">
          Check back later for new menu items
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dishes.map((dish) => (
        <DishesCard
          key={dish._id}
          dish={dish}
          onAddToCart={() => handleAddToCart(dish)}
          formatCurrency={formatCurrency}
        />
      ))}
    </div>
  );
};

export default Dishes;
