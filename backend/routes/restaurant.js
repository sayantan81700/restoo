import express from "express";
import {
  protect,
  authorize,
  verifyRestaurantOwner,
} from "../middleware/auth.js";
import * as restaurantController from "../controllers/restaurantController.js";

const router = express.Router();

router
  .route("/")
  .get(restaurantController.getRestaurants)
  .post(
    protect,
    authorize("admin", "restaurant_owner"),
    restaurantController.createRestaurant
  );

router
  .route("/:id")
  .get(restaurantController.getRestaurantById)
  .put(protect, verifyRestaurantOwner, restaurantController.updateRestaurant)
  .delete(protect, authorize("admin"), restaurantController.deleteRestaurant);

router
  .route("/:id/menu")
  .get(restaurantController.getMenuItems)
  .post(protect, verifyRestaurantOwner, restaurantController.addMenuItem);

export default router;
