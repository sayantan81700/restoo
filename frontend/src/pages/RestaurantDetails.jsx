import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchRestaurantById,
  fetchMenuItems,
} from "../store/slices/restaurantSlice";
import { addToCart } from "../store/slices/cartSlice";
import { FaStar } from "react-icons/fa";

const RestaurantDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentRestaurant, menuItems, loading, error } = useSelector(
    (state) => state.restaurant
  );
  const { items: cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchRestaurantById(id));
    dispatch(fetchMenuItems(id));
  }, [dispatch, id]);

  const handleAddToCart = (item) => {
    dispatch(addToCart({ item, restaurant: currentRestaurant }));
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      {loading && <div className="text-center text-gray-500">Loading...</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {!loading && currentRestaurant && (
        <>
          {/* Restaurant Info */}
          <div className="mb-8 flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 w-full md:w-72 h-48 md:h-64 bg-gray-200 rounded-lg overflow-hidden">
              {currentRestaurant.images && currentRestaurant.images[0] && (
                <img
                  src={currentRestaurant.images[0]}
                  alt={currentRestaurant.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">
                {currentRestaurant.name}
              </h2>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-orange-600 font-semibold flex items-center">
                  <FaStar className="mr-1" />
                  {currentRestaurant.rating?.toFixed(1) || "New"}
                </span>
                <span className="text-gray-500">
                  ({currentRestaurant.totalRatings || 0} reviews)
                </span>
              </div>
              <div className="text-gray-600 mb-2">
                {currentRestaurant.cuisine?.join(", ")}
              </div>
              <div className="text-gray-500 mb-2">
                {currentRestaurant.description}
              </div>
              <div className="text-gray-500 mb-2">
                {currentRestaurant.address?.street},{" "}
                {currentRestaurant.address?.city},{" "}
                {currentRestaurant.address?.state}
              </div>
              <div className="text-gray-500">
                Delivery Fee: ${currentRestaurant.deliveryFee}
              </div>
            </div>
          </div>

          {/* Menu */}
          <h3 className="text-2xl font-semibold mb-4">Menu</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {menuItems.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">
                No menu items found.
              </div>
            ) : (
              menuItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow p-4 flex flex-col"
                >
                  <div className="h-32 bg-gray-100 rounded mb-2 overflow-hidden">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <h4 className="font-semibold text-lg mb-1">{item.name}</h4>
                  <div className="text-gray-500 text-sm mb-1">
                    {item.description}
                  </div>
                  <div className="text-gray-600 font-semibold mb-2">
                    ${item.price}
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-auto bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
                    disabled={cartItems.some((ci) => ci._id === item._id)}
                  >
                    {cartItems.some((ci) => ci._id === item._id)
                      ? "In Cart"
                      : "Add to Cart"}
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Reviews */}
          <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
          <div className="space-y-4">
            {/* TODO: Map reviews here */}
            <div className="text-gray-500">Reviews will appear here.</div>
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantDetails;
