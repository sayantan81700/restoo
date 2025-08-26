import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, updateOrderStatus } from "../../store/slices/orderSlice";
import Button from "../../layouts/Button";

const DeliveryDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders, loading } = useSelector((state) => state.order);
  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    // Fetch delivery orders for the current delivery partner
    dispatch(fetchOrders({ deliveryPartner: user._id, status: "assigned" }));
  }, [dispatch, user]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await dispatch(
        updateOrderStatus({ orderId, status: newStatus })
      ).unwrap();
      // Refresh orders after status update
      dispatch(fetchOrders({ deliveryPartner: user._id, status: "assigned" }));
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Fetch orders based on tab
    const status =
      tab === "active" ? "assigned" : tab === "completed" ? "delivered" : "all";
    dispatch(fetchOrders({ deliveryPartner: user._id, status }));
  };

  const activeOrders =
    orders?.filter((order) => order.status === "assigned") || [];
  const completedOrders =
    orders?.filter((order) => order.status === "delivered") || [];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "preparing":
        return "bg-orange-100 text-orange-800";
      case "out_for_delivery":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Delivery Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your delivery assignments
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                {user?.status || "ACTIVE"}
              </span>
              <Button
                onClick={() => (window.location.href = "/delivery/profile")}
                variant="outline"
              >
                Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Active Orders
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {activeOrders.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Completed Today
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {completedOrders.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Earnings
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(
                    completedOrders.reduce(
                      (sum, order) => sum + (order.deliveryFee || 0),
                      0
                    )
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => handleTabChange("active")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "active"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Active Orders ({activeOrders.length})
              </button>
              <button
                onClick={() => handleTabChange("completed")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "completed"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Completed ({completedOrders.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "active" && (
              <div>
                {activeOrders.length === 0 ? (
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
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-600">No active orders</p>
                    <p className="text-gray-500 text-sm">
                      You'll see new delivery assignments here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeOrders.map((order) => (
                      <div
                        key={order._id}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">
                              Order #{order.orderNumber}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {order.restaurant?.name}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900">
                              {formatCurrency(order.totalAmount)}
                            </p>
                            <p className="text-sm text-gray-600">
                              Delivery Fee:{" "}
                              {formatCurrency(order.deliveryFee || 0)}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Pickup Address
                            </p>
                            <p className="text-sm text-gray-600">
                              {order.restaurant?.address}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Delivery Address
                            </p>
                            <p className="text-sm text-gray-600">
                              {order.deliveryAddress}
                            </p>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <Button
                            onClick={() =>
                              handleStatusUpdate(order._id, "picked_up")
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Mark as Picked Up
                          </Button>
                          <Button
                            onClick={() =>
                              handleStatusUpdate(order._id, "delivered")
                            }
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Mark as Delivered
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "completed" && (
              <div>
                {completedOrders.length === 0 ? (
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
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-600">No completed orders</p>
                    <p className="text-gray-500 text-sm">
                      Completed deliveries will appear here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {completedOrders.map((order) => (
                      <div
                        key={order._id}
                        className="border border-gray-200 rounded-lg p-4 bg-green-50"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">
                              Order #{order.orderNumber}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {order.restaurant?.name}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900">
                              {formatCurrency(order.totalAmount)}
                            </p>
                            <p className="text-sm text-green-600">
                              +{formatCurrency(order.deliveryFee || 0)} earned
                            </p>
                          </div>
                        </div>

                        <div className="text-sm text-gray-600">
                          <p>
                            Completed on:{" "}
                            {new Date(order.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;
