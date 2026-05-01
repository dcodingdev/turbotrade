import { Router } from "express";
import * as orderController from "./order.controller.js";
import { authorize, authenticate } from "@repo/common"
import { UserRole } from "@repo/types";

const router = Router();

/**
 * Global Middleware: All order operations require a logged-in user
 */
router.use(authenticate);

router.route("/")
  /**
   * @route   POST /api/v1/orders
   * @desc    Place a new order & reserve stock
   * @access  Private (All Roles)
   */
  .post(orderController.createOrder);

router.route("/me")
  /**
   * @route   GET /api/v1/orders/me
   * @desc    Get logged-in user's order history
   * @access  Private (All Roles)
   */
  .get(orderController.getMyOrders);

router.route("/:id")
  /**
   * @route   GET /api/v1/orders/:id
   * @desc    Get details of a specific order
   * @access  Private (Owner or Admin)
   */
  .get(orderController.getOrderById);

/**
 * Optional: Admin-only route to see all orders across the platform
 */
router.route("/all")
  .get(
    authorize([UserRole.ADMIN]),
    // You'd need to implement this in your controller
    // orderController.getAllOrders 
  );

export default router;