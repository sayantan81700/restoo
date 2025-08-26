import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import * as orderController from "../controllers/orderController.js";

const router = express.Router();

router
  .route("/")
  .get(protect, orderController.getOrders)
  .post(protect, orderController.createOrder);

router
  .route("/:id")
  .get(protect, orderController.getOrderById)
  .put(protect, orderController.updateOrder)
  .delete(protect, authorize("admin"), orderController.deleteOrder);

router.route("/:id/status").put(protect, orderController.updateOrderStatus);

router.route("/:id/cancel").put(protect, orderController.cancelOrder);

export default router;
