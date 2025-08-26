import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { notFound, errorHandler } from "./middleware/error.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import restaurantRoutes from "./routes/restaurant.js";
import menuItemRoutes from "./routes/menuItem.js";
import orderRoutes from "./routes/order.js";
import reviewRoutes from "./routes/review.js";
import uploadRoutes from "./routes/upload.js";
import paymentRoutes from "./routes/payment.js";
import profileRoutes from "./routes/profile.js";
import adminRoutes from "./routes/admin.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Restoo API" });
});

// Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menu-items", menuItemRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server function
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.error("❌ Unhandled Rejection:", err.message);
  // Close server & exit process
  process.exit(1);
});

// Start the server
startServer();
