import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { clearCart } from "../store/slices/cartSlice";
import {
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { itemCount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
    setIsMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return null;
    switch (user.role) {
      case "admin":
        return "/admin/dashboard";
      case "restaurant_owner":
        return "/restaurant/dashboard";
      case "delivery_partner":
        return "/delivery/dashboard";
      default:
        return null;
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-orange-600">Restoo</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/restaurants"
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              Restaurants
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/orders"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Orders
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Profile
                </Link>
                {getDashboardLink() && (
                  <Link
                    to={getDashboardLink()}
                    className="text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Right side - Cart and Auth */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors"
            >
              <FaShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-orange-600 transition-colors"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/restaurants"
              className="block px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Restaurants
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/orders"
                  className="block px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Orders
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                {getDashboardLink() && (
                  <Link
                    to={getDashboardLink()}
                    className="block px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
