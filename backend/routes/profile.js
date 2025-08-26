import express from "express";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, (req, res) => {
  res.json({ message: "Get user profile" });
});

router.put("/", protect, (req, res) => {
  res.json({ message: "Update user profile" });
});

export default router;
