import { Router } from "express";
import * as reviewController from "./review.controller.js";
import { authenticate } from "@repo/common";

const router = Router();

/**
 * @route   GET /api/products/:productId/reviews
 * @desc    Get all reviews for a product
 * @access  Public
 */
router.get("/:productId/reviews", reviewController.getProductReviews);

/**
 * @route   POST /api/products/:productId/reviews
 * @desc    Create a new review
 * @access  Private (Logged-in customers)
 */
router.post("/:productId/reviews", authenticate, reviewController.createReview);

export default router;
