import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, updateOrderStatus } from "../../store/slices/orderSlice";
import Button from "../../layouts/Button";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchOrders({}));
  }, [dispatch]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    const status = newFilter === "all" ? undefined : newFilter;
    dispatch(fetchOrders({ status }));
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await dispatch(
        updateOrderStatus({ orderId, status: newStatus })
      ).unwrap();
      dispatch(fetchOrders({}));
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
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600 mt-2">
            Monitor and manage all platform orders
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {[
              { value: "all", label: "All Orders" },
              { value: "pending", label: "Pending" },
              { value: "confirmed", label: "Confirmed" },
              { value: "preparing", label: "Preparing" },
              { value: "out_for_delivery", label: "Out for Delivery" },
              { value: "delivered", label: "Delivered" },
              { value: "cancelled", label: "Cancelled" },
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

        {/* Orders List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Orders ({orders?.length || 0})
            </h3>
          </div>

          {!orders || orders.length === 0 ? (
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
                {filter === "all"
                  ? "No orders have been placed yet"
                  : `No ${filter.replace("_", " ")} orders found`}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {orders?.map((order) => (
                <div key={order._id} className="p-6 hover:bg-gray-50">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4 lg:mb-0">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">
                            Order #{order.orderNumber}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
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
                            Restaurant
                          </p>
                          <p className="text-sm text-gray-900">
                            {order.restaurant?.name || "Unknown"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.restaurant?.address}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Delivery Address
                          </p>
                          <p className="text-sm text-gray-900">
                            {order.deliveryAddress}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Order Items
                        </p>
                        <div className="space-y-1">
                          {order.items?.slice(0, 3).map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-gray-700">
                                {item.quantity}x{" "}
                                {item.menuItem?.name || "Unknown Item"}
                              </span>
                              <span className="text-gray-600">
                                {formatCurrency(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                          {order.items?.length > 3 && (
                            <p className="text-xs text-gray-500">
                              +{order.items.length - 3} more items
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="lg:ml-6 lg:flex-shrink-0 mt-4 lg:mt-0">
                      <div className="space-y-2">
                        {order.status === "pending" && (
                          <Button
                            onClick={() =>
                              handleStatusUpdate(order._id, "confirmed")
                            }
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Confirm Order
                          </Button>
                        )}

                        {order.status === "confirmed" && (
                          <Button
                            onClick={() =>
                              handleStatusUpdate(order._id, "preparing")
                            }
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                          >
                            Start Preparing
                          </Button>
                        )}

                        {order.status === "preparing" && (
                          <Button
                            onClick={() =>
                              handleStatusUpdate(order._id, "out_for_delivery")
                            }
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                          >
                            Ready for Delivery
                          </Button>
                        )}

                        {order.status === "out_for_delivery" && (
                          <Button
                            onClick={() =>
                              handleStatusUpdate(order._id, "delivered")
                            }
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                          >
                            Mark as Delivered
                          </Button>
                        )}

                        {(order.status === "pending" ||
                          order.status === "confirmed") && (
                          <Button
                            onClick={() =>
                              handleStatusUpdate(order._id, "cancelled")
                            }
                            className="w-full bg-red-600 hover:bg-red-700 text-white"
                          >
                            Cancel Order
                          </Button>
                        )}

                        <Button
                          onClick={() =>
                            (window.location.href = `/orders/${order._id}`)
                          }
                          className="w-full bg-gray-600 hover:bg-gray-700 text-white"
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

export default AdminOrders;
