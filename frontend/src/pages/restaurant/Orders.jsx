import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, updateOrderStatus } from "../../store/slices/orderSlice";
import Button from "../../layouts/Button";

const RestaurantOrders = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders, loading } = useSelector((state) => state.order);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user?.restaurant) {
      dispatch(fetchOrders({ restaurant: user.restaurant }));
    }
  }, [dispatch, user]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await dispatch(
        updateOrderStatus({ orderId, status: newStatus })
      ).unwrap();
      dispatch(fetchOrders({ restaurant: user.restaurant }));
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
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

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filter === "all" || order.status === filter;
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "preparing", label: "Preparing" },
    { value: "out_for_delivery", label: "Out for Delivery" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

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
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600 mt-2">
            Manage orders for your restaurant
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Search Orders
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by order ID or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label
                htmlFor="filter"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Filter by Status
              </label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="all">All Orders</option>
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Orders ({filteredOrders.length})
            </h3>
          </div>

          {filteredOrders.length === 0 ? (
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <p className="text-gray-600">No orders found</p>
              <p className="text-gray-500 text-sm">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <div key={order._id} className="p-6 hover:bg-gray-50">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4 lg:mb-0">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">
                            Order #{order._id.slice(-8)}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            {formatCurrency(order.totalAmount)}
                          </p>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status.replace("_", " ").toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Customer
                          </p>
                          <p className="text-sm text-gray-900">
                            {order.customer?.name || "Unknown"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.customer?.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Delivery Address
                          </p>
                          <p className="text-sm text-gray-900">
                            {order.deliveryAddress || "Not provided"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Payment Method
                          </p>
                          <p className="text-sm text-gray-900">
                            {order.paymentMethod || "Not specified"}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Order Items
                        </p>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between text-sm p-2 bg-gray-50 rounded"
                            >
                              <span className="text-gray-700">
                                {item.quantity}x{" "}
                                {item.menuItem?.name || "Unknown Item"}
                              </span>
                              <span className="text-gray-900">
                                {formatCurrency(item.price)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {order.specialInstructions && (
                        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm font-medium text-yellow-800">
                            Special Instructions
                          </p>
                          <p className="text-sm text-yellow-700">
                            {order.specialInstructions}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="lg:ml-6 lg:flex-shrink-0 mt-4 lg:mt-0">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Update Status
                        </label>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusUpdate(order._id, e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>

                        <Button
                          onClick={() =>
                            (window.location.href = `/orders/${order._id}`)
                          }
                          className="w-full"
                          variant="outline"
                        >
                          View Details
                        </Button>
                      </div>
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

export default RestaurantOrders;
