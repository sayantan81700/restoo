import express from "express";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.use(protect, authorize("admin"));

router.get("/users", (req, res) => {
  res.json({ message: "Get all users" });
});

router.get("/restaurants", (req, res) => {
  res.json({ message: "Get all restaurants (admin)" });
});

router.get("/orders", (req, res) => {
  res.json({ message: "Get all orders (admin)" });
});

export default router;
