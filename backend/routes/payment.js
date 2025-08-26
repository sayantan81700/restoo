import express from "express";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-payment-intent", protect, (req, res) => {
  res.json({ message: "Create payment intent" });
});

router.post("/confirm", protect, (req, res) => {
  res.json({ message: "Confirm payment" });
});

export default router;
