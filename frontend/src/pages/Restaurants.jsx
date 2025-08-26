import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRestaurants } from "../store/slices/restaurantSlice";

const Restaurants = () => {
  const dispatch = useDispatch();
  const { restaurants, loading, error } = useSelector(
    (state) => state.restaurant
  );

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Restaurants</h2>
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-lg h-64 animate-pulse"
            ></div>
          ))}
        </div>
      )}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {restaurants.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No restaurants found.
            </div>
          ) : (
            restaurants.map((restaurant) => (
              <Link
                key={restaurant._id}
                to={`/restaurants/${restaurant._id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="h-48 bg-gray-200 relative">
                  {restaurant.images && restaurant.images[0] && (
                    <img
                      src={restaurant.images[0]}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-semibold text-orange-600">
                    ⭐ {restaurant.rating?.toFixed(1) || "New"}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    {restaurant.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {restaurant.cuisine?.join(", ")}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>${restaurant.deliveryFee} delivery</span>
                    <span>{restaurant.preparationTime || 30} min</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Restaurants;
