import express from "express";
import {
  protect,
  authorize,
  verifyRestaurantOwner,
} from "../middleware/auth.js";
import * as menuItemController from "../controllers/menuItemController.js";

const router = express.Router();

router
  .route("/")
  .post(
    protect,
    authorize("admin", "restaurant_owner"),
    menuItemController.createMenuItem
  );

router
  .route("/:id")
  .get(menuItemController.getMenuItemById)
  .put(protect, verifyRestaurantOwner, menuItemController.updateMenuItem)
  .delete(
    protect,
    authorize("admin", "restaurant_owner"),
    menuItemController.deleteMenuItem
  );

export default router;
