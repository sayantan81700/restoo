import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { store } from "./store";
import PrivateRoute from "./components/routing/PrivateRoute";
import AdminRoute from "./components/routing/AdminRoute";
import RestaurantOwnerRoute from "./components/routing/RestaurantOwnerRoute";
import DeliveryPartnerRoute from "./components/routing/DeliveryPartnerRoute";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";

// Main Pages
import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

// Restaurant Owner Pages
import RestaurantDashboard from "./pages/restaurant/Dashboard";
import RestaurantMenu from "./pages/restaurant/Menu";
import RestaurantOrders from "./pages/restaurant/Orders";
import RestaurantSettings from "./pages/restaurant/Settings";

// Delivery Partner Pages
import DeliveryDashboard from "./pages/delivery/Dashboard";
import DeliveryOrders from "./pages/delivery/Orders";
import DeliveryProfile from "./pages/delivery/Profile";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminRestaurants from "./pages/admin/Restaurants";
import AdminOrders from "./pages/admin/Orders";
import AdminSettings from "./pages/admin/Settings";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ToastContainer position="top-right" />
          <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
              <Route path="/verify-email/:token" element={<VerifyEmail />} />
            </Route>

            {/* Main Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/restaurants/:id" element={<RestaurantDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route
                path="/checkout"
                element={
                  <PrivateRoute>
                    <Checkout />
                  </PrivateRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <PrivateRoute>
                    <Orders />
                  </PrivateRoute>
                }
              />
              <Route
                path="/orders/:id"
                element={
                  <PrivateRoute>
                    <OrderDetails />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
            </Route>

            {/* Restaurant Owner Routes */}
            <Route
              element={
                <PrivateRoute>
                  <RestaurantOwnerRoute>
                    <DashboardLayout />
                  </RestaurantOwnerRoute>
                </PrivateRoute>
              }
            >
              <Route
                path="/restaurant/dashboard"
                element={<RestaurantDashboard />}
              />
              <Route path="/restaurant/menu" element={<RestaurantMenu />} />
              <Route path="/restaurant/orders" element={<RestaurantOrders />} />
              <Route
                path="/restaurant/settings"
                element={<RestaurantSettings />}
              />
            </Route>

            {/* Delivery Partner Routes */}
            <Route
              element={
                <PrivateRoute>
                  <DeliveryPartnerRoute>
                    <DashboardLayout />
                  </DeliveryPartnerRoute>
                </PrivateRoute>
              }
            >
              <Route
                path="/delivery/dashboard"
                element={<DeliveryDashboard />}
              />
              <Route path="/delivery/orders" element={<DeliveryOrders />} />
              <Route path="/delivery/profile" element={<DeliveryProfile />} />
            </Route>

            {/* Admin Routes */}
            <Route
              element={
                <PrivateRoute>
                  <AdminRoute>
                    <DashboardLayout />
                  </AdminRoute>
                </PrivateRoute>
              }
            >
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/restaurants" element={<AdminRestaurants />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
