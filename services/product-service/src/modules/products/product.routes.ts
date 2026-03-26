


// services/product-service/src/modules/products/product.routes.ts
import { Router } from "express";
import * as productController from "./product.controller";
import { authenticate, authorize } from "@repo/auth-service";
import { UserRole } from "@repo/types"

const router = Router();

router.route("/")
  .get(productController.getAllProducts)
  .post(
    authenticate, 
    // This now works because UserRole is an Enum (a value), not just a type
    authorize([UserRole.VENDOR, UserRole.ADMIN]), 
    productController.createProduct
  );

router.route("/:id")
  .get(productController.getProductById)
  .patch(
    authenticate, 
    authorize([UserRole.VENDOR, UserRole.ADMIN]), 
    productController.updateProduct
  )
  .delete(
    authenticate, 
    authorize([UserRole.VENDOR, UserRole.ADMIN]), 
    productController.deleteProduct
  );

router.patch(
  "/:id/toggle-publish", 
  authenticate, 
  authorize([UserRole.VENDOR, UserRole.ADMIN]), 
  productController.togglePublishStatus
);

export default router;

