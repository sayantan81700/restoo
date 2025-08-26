import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { fetchAllUsers, updateUserStatus } from "../../store/slices/authSlice";
import Button from "../../layouts/Button";

const AdminUsers = () => {
  const dispatch = useDispatch();
  // const { users, loading } = useSelector((state) => state.auth);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    // dispatch(fetchAllUsers({ role: newFilter === "all" ? undefined : newFilter }));
  };

  const handleStatusUpdate = async (userId, newStatus) => {
    try {
      // await dispatch(updateUserStatus({ userId, status: newStatus })).unwrap();
      // dispatch(fetchAllUsers());
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "customer":
        return "bg-blue-100 text-blue-800";
      case "restaurant_owner":
        return "bg-green-100 text-green-800";
      case "delivery_partner":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "suspended":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesFilter = filter === "all" || user.role === filter;
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const roleOptions = [
    { value: "customer", label: "Customer" },
    { value: "restaurant_owner", label: "Restaurant Owner" },
    { value: "delivery_partner", label: "Delivery Partner" },
    { value: "admin", label: "Admin" },
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "suspended", label: "Suspended" },
  ];

  if (false /* loading */) {
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
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Manage all users on the platform</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Search Users
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by name or email..."
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
                Filter by Role
              </label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="all">All Users</option>
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Users ({filteredUsers.length})
            </h3>
          </div>

          {filteredUsers.length === 0 ? (
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-600">No users found</p>
              <p className="text-gray-500 text-sm">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <div key={user._id} className="p-6 hover:bg-gray-50">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-lg font-bold text-orange-600">
                            {user.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-medium text-gray-900">
                              {user.name}
                            </h4>
                            <div className="flex space-x-2">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(
                                  user.role
                                )}`}
                              >
                                {user.role.replace("_", " ").toUpperCase()}
                              </span>
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                  user.status
                                )}`}
                              >
                                {user.status?.toUpperCase() || "ACTIVE"}
                              </span>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-3">
                            {user.email}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="font-medium text-gray-700">Phone</p>
                              <p className="text-gray-900">
                                {user.phone || "Not provided"}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">
                                Address
                              </p>
                              <p className="text-gray-900">
                                {user.address || "Not provided"}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">
                                Joined
                              </p>
                              <p className="text-gray-900">
                                {formatDate(user.createdAt)}
                              </p>
                            </div>
                          </div>

                          {user.role === "restaurant_owner" &&
                            user.restaurant && (
                              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                <p className="font-medium text-gray-700 text-sm">
                                  Restaurant
                                </p>
                                <p className="text-gray-900 text-sm">
                                  {user.restaurant.name}
                                </p>
                                <p className="text-gray-500 text-xs">
                                  {user.restaurant.cuisine}
                                </p>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>

                    <div className="lg:ml-6 lg:flex-shrink-0 mt-4 lg:mt-0">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Update Status
                        </label>
                        <select
                          value={user.status || "active"}
                          onChange={(e) =>
                            handleStatusUpdate(user._id, e.target.value)
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
                            (window.location.href = `/admin/users/${user._id}`)
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

export default AdminUsers;
