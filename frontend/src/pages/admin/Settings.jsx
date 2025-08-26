import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { updateAdminSettings } from "../../store/slices/authSlice";
import Button from "../../layouts/Button";

const AdminSettings = () => {
  const dispatch = useDispatch();
  // const { user, loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    // Add your admin settings fields here
    siteName: "",
    supportEmail: "",
    maintenanceMode: false,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch current settings if needed
    // setFormData({ ... });
  }, []);

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
      // await dispatch(updateAdminSettings(formData)).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update admin settings:", error);
    }
  };

  if (false /* loading */) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
          <p className="text-gray-600 mt-2">Manage platform-wide settings</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Name
              </label>
              <input
                type="text"
                name="siteName"
                value={formData.siteName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Support Email
              </label>
              <input
                type="email"
                name="supportEmail"
                value={formData.supportEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={formData.maintenanceMode}
                onChange={handleInputChange}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Maintenance Mode
              </label>
            </div>

            <div className="flex space-x-3">
              <Button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                Save Settings
              </Button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
