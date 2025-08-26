import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Restaurant from "../models/Restaurant.js";

// Protect routes
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Not authorized, user not found",
        });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }
};

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};

// Verify restaurant owner
export const verifyRestaurantOwner = async (req, res, next) => {
  if (req.user.role !== "restaurant_owner") {
    return res.status(403).json({
      success: false,
      message: "Only restaurant owners can access this route",
    });
  }

  // If restaurantId is provided in params, verify ownership
  if (req.params.restaurantId) {
    const restaurant = await Restaurant.findById(req.params.restaurantId);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    if (restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this restaurant",
      });
    }
  }

  next();
};

// Verify delivery partner
export const verifyDeliveryPartner = async (req, res, next) => {
  if (req.user.role !== "delivery_partner") {
    return res.status(403).json({
      success: false,
      message: "Only delivery partners can access this route",
    });
  }
  next();
};
