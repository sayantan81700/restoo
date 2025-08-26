import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRestaurants } from "../../store/slices/restaurantSlice";
// import { updateRestaurantStatus } from "../../store/slices/restaurantSlice";
import Button from "../../layouts/Button";

const AdminRestaurants = () => {
  const dispatch = useDispatch();
  const { restaurants, loading } = useSelector((state) => state.restaurant);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchRestaurants({}));
  }, [dispatch]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    const status = newFilter === "all" ? undefined : newFilter;
    dispatch(fetchRestaurants({ status }));
  };

  const handleStatusUpdate = async (restaurantId, newStatus) => {
    try {
      // await dispatch(updateRestaurantStatus({ restaurantId, status: newStatus })).unwrap();
      // dispatch(fetchRestaurants({}));
    } catch (error) {
      console.error("Failed to update restaurant status:", error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Restaurant Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage all restaurants on the platform
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {[
              { value: "all", label: "All Restaurants" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
              { value: "pending", label: "Pending" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleFilterChange(tab.value)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  filter === tab.value
                    ? "bg-orange-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Restaurants List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Restaurants ({restaurants?.length || 0})
            </h3>
          </div>

          {!restaurants || restaurants.length === 0 ? (
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <p className="text-gray-600">No restaurants found</p>
              <p className="text-gray-500 text-sm">
                {filter === "all"
                  ? "No restaurants have been registered yet"
                  : `No ${filter} restaurants found`}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {restaurants?.map((restaurant) => (
                <div key={restaurant._id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      {restaurant.image ? (
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      ) : (
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
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-medium text-gray-900">
                          {restaurant.name}
                        </h4>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            restaurant.status
                          )}`}
                        >
                          {restaurant.status.toUpperCase()}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">
                        {restaurant.cuisine} • {restaurant.address}
                      </p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Rating: {restaurant.rating || "N/A"}</span>
                        <span>
                          Delivery Fee:{" "}
                          {formatCurrency(restaurant.deliveryFee || 0)}
                        </span>
                        <span>
                          Min Order: {formatCurrency(restaurant.minOrder || 0)}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {/*
                      {restaurant.status === "pending" && (
                        <Button
                          onClick={() => handleStatusUpdate(restaurant._id, "active")}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Approve
                        </Button>
                      )}

                      {restaurant.status === "active" && (
                        <Button
                          onClick={() => handleStatusUpdate(restaurant._id, "inactive")}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          Deactivate
                        </Button>
                      )}

                      {restaurant.status === "inactive" && (
                        <Button
                          onClick={() => handleStatusUpdate(restaurant._id, "active")}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Activate
                        </Button>
                      )}
                      */}
                      <Button
                        onClick={() =>
                          (window.location.href = `/restaurants/${restaurant._id}`)
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRestaurants;
