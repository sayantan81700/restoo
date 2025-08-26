import express from "express";
import { protect } from "../middleware/auth.js";
import * as reviewController from "../controllers/reviewController.js";

const router = express.Router();

router
  .route("/")
  .get(reviewController.getReviews)
  .post(protect, reviewController.createReview);

router
  .route("/:id")
  .put(protect, reviewController.updateReview)
  .delete(protect, reviewController.deleteReview);

export default router;
