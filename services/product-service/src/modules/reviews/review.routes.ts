import { Router } from "express";
import * as reviewController from "./review.controller.js";
import { authenticate } from "@repo/common";

// NOTE: Since these routes are mounted at /api/products, 
// the endpoints here should be designed assuming the path is already nested if necessary.
// Actually, it's easier to mount them directly on productRoutes.
// Let's export the router and mount it in product.routes.js or server.js
const router = Router({ mergeParams: true });

router.route("/")
  /**
   * @route   GET /api/products/:productId/reviews
   * @desc    Get all reviews for a product
   * @access  Public
   */
  .get(reviewController.getProductReviews)
  
  /**
   * @route   POST /api/products/:productId/reviews
   * @desc    Create a verified review for a product
   * @access  Private (All Roles)
   */
  .post(authenticate, reviewController.createReview);

export default router;
