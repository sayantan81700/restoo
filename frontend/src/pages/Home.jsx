import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRestaurants } from "../store/slices/restaurantSlice";
import { FaStar, FaClock, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

const Home = () => {
  const dispatch = useDispatch();
  const { restaurants, loading } = useSelector((state) => state.restaurant);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchRestaurants({ limit: 6 }));
  }, [dispatch]);

  const featuredRestaurants = restaurants.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Delicious Food Delivered to Your Door
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-orange-100">
            Order from your favorite restaurants and get it delivered fast
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/restaurants"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Browse Restaurants
              <FaArrowRight className="ml-2" />
            </Link>
            {!isAuthenticated && (
              <Link
                to="/register"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
              >
                Join Now
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Restoo?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-orange-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your food delivered in 30 minutes or less
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-orange-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Food</h3>
              <p className="text-gray-600">
                Only the best restaurants partner with us
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-orange-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Coverage</h3>
              <p className="text-gray-600">We deliver to your neighborhood</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Restaurants</h2>
            <Link
              to="/restaurants"
              className="text-orange-600 hover:text-orange-700 font-semibold flex items-center"
            >
              View All
              <FaArrowRight className="ml-2" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-gray-200 rounded-lg h-64 animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredRestaurants.map((restaurant) => (
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
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-xl mb-8 text-orange-100">
            Join thousands of satisfied customers who order with Restoo
          </p>
          <Link
            to="/restaurants"
            className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Start Ordering Now
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
