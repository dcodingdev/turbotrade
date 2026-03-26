import { Router } from "express";
import * as stockController from "./stock.controller";

const router = Router();

// Vendor endpoints
router.patch("/:productId/inventory", stockController.updatePhysicalStock);

// Transactional endpoints (Usually called via RabbitMQ or Internal API)
router.post("/:productId/reserve", stockController.reserveStock);
router.post("/:productId/confirm", stockController.confirmSale);
router.post("/:productId/release", stockController.releaseReservation);

export default router;