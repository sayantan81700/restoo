import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  login: (credentials) => api.post("/auth/login", credentials),
  getMe: () => api.get("/auth/me"),
  updateProfile: (userData) => api.put("/auth/updatedetails", userData),
  updatePassword: (passwordData) =>
    api.put("/auth/updatepassword", passwordData),
  forgotPassword: (email) => api.post("/auth/forgotpassword", { email }),
  resetPassword: (token, password) =>
    api.put(`/auth/resetpassword/${token}`, { password }),
  verifyEmail: (token) => api.get(`/auth/verify/${token}`),
};

// Restaurant API
export const restaurantAPI = {
  getRestaurants: (params) => api.get("/restaurants", { params }),
  getRestaurantById: (id) => api.get(`/restaurants/${id}`),
  getMenuItems: (restaurantId) => api.get(`/restaurants/${restaurantId}/menu`),
  createRestaurant: (restaurantData) =>
    api.post("/restaurants", restaurantData),
  updateRestaurant: (id, restaurantData) =>
    api.put(`/restaurants/${id}`, restaurantData),
  deleteRestaurant: (id) => api.delete(`/restaurants/${id}`),
};

// Menu Item API
export const menuItemAPI = {
  getMenuItems: (restaurantId) => api.get(`/restaurants/${restaurantId}/menu`),
  getMenuItemById: (id) => api.get(`/menu-items/${id}`),
  createMenuItem: (menuItemData) => api.post("/menu-items", menuItemData),
  updateMenuItem: (id, menuItemData) =>
    api.put(`/menu-items/${id}`, menuItemData),
  deleteMenuItem: (id) => api.delete(`/menu-items/${id}`),
};

// Order API
export const orderAPI = {
  createOrder: (orderData) => api.post("/orders", orderData),
  getOrders: (params) => api.get("/orders", { params }),
  getOrderById: (id) => api.get(`/orders/${id}`),
  updateOrderStatus: (orderId, status) =>
    api.put(`/orders/${orderId}/status`, { status }),
  cancelOrder: (orderId) => api.put(`/orders/${orderId}/cancel`),
};

// Review API
export const reviewAPI = {
  getReviews: (params) => api.get("/reviews", { params }),
  createReview: (reviewData) => api.post("/reviews", reviewData),
  updateReview: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
};

// Payment API
export const paymentAPI = {
  createPaymentIntent: (paymentData) =>
    api.post("/payments/create-payment-intent", paymentData),
  confirmPayment: (paymentData) => api.post("/payments/confirm", paymentData),
};

// Upload API
export const uploadAPI = {
  uploadImage: (formData) =>
    api.post("/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default api;
