import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../layouts/Button";

const RestaurantSettings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { restaurant, loading } = useSelector((state) => state.restaurant);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cuisine: "",
    phone: "",
    address: "",
    deliveryTime: "",
    preparationTime: "",
    minOrderAmount: "",
    isOpen: true,
    acceptsDelivery: true,
    acceptsPickup: false,
  });

  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name || "",
        description: restaurant.description || "",
        cuisine: restaurant.cuisine || "",
        phone: restaurant.phone || "",
        address: restaurant.address || "",
        deliveryTime: restaurant.deliveryTime || "",
        preparationTime: restaurant.preparationTime || "",
        minOrderAmount: restaurant.minOrderAmount || "",
        isOpen: restaurant.isOpen !== false,
        acceptsDelivery: restaurant.acceptsDelivery !== false,
        acceptsPickup: restaurant.acceptsPickup || false,
      });
    }
  }, [restaurant]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement updateRestaurant thunk
      console.log("Update restaurant:", formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update restaurant:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: restaurant.name || "",
      description: restaurant.description || "",
      cuisine: restaurant.cuisine || "",
      phone: restaurant.phone || "",
      address: restaurant.address || "",
      deliveryTime: restaurant.deliveryTime || "",
      preparationTime: restaurant.preparationTime || "",
      minOrderAmount: restaurant.minOrderAmount || "",
      isOpen: restaurant.isOpen !== false,
      acceptsDelivery: restaurant.acceptsDelivery !== false,
      acceptsPickup: restaurant.acceptsPickup || false,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
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
          <p className="text-gray-600">No restaurant found</p>
          <p className="text-gray-500 text-sm">
            Please contact support to set up your restaurant
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Restaurant Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your restaurant information and preferences
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Restaurant Information
              </h3>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>
                  Edit Settings
                </Button>
              ) : (
                <div className="flex space-x-3">
                  <Button onClick={handleSubmit}>Save Changes</Button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Restaurant Image */}
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                {restaurant.image ? (
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                ) : (
                  <svg
                    className="w-12 h-12 text-gray-400"
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
              <div>
                <h4 className="text-lg font-medium text-gray-900">
                  {restaurant.name}
                </h4>
                <p className="text-gray-600">{restaurant.cuisine}</p>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    restaurant.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {restaurant.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Basic Information */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">
                Basic Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cuisine Type
                  </label>
                  <input
                    type="text"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                    placeholder="e.g., Italian, Chinese, Indian"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                    placeholder="Describe your restaurant..."
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">
                Contact Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Service Settings */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">
                Service Settings
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Time (minutes)
                  </label>
                  <input
                    type="number"
                    name="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                    placeholder="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preparation Time (minutes)
                  </label>
                  <input
                    type="number"
                    name="preparationTime"
                    value={formData.preparationTime}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                    placeholder="15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Order Amount ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="minOrderAmount"
                    value={formData.minOrderAmount}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                    placeholder="10.00"
                  />
                </div>
              </div>
            </div>

            {/* Service Options */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">
                Service Options
              </h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isOpen"
                    checked={formData.isOpen}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded disabled:bg-gray-100"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Restaurant is open for orders
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="acceptsDelivery"
                    checked={formData.acceptsDelivery}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded disabled:bg-gray-100"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Accept delivery orders
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="acceptsPickup"
                    checked={formData.acceptsPickup}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded disabled:bg-gray-100"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Accept pickup orders
                  </label>
                </div>
              </div>
            </div>

            {/* Restaurant Statistics */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-md font-medium text-gray-900 mb-4">
                Restaurant Statistics
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-600">
                    {restaurant.rating || 0}
                  </div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {restaurant.reviewCount || 0}
                  </div>
                  <div className="text-sm text-gray-600">Total Reviews</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {restaurant.menuItems?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Menu Items</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <div className="text-sm text-gray-600">Total Orders</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSettings;
