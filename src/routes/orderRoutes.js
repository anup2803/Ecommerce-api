const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const {
  getUserOrderHistoryController,
  createOrderController,
  updateUserOrderController,
  cancleUserOrderController,
} = require("../controllers/orderController");
const {
  createOrderValidator,
  updateOrderStatusValidator,
} = require("../middleware/orderValidator");
const { adminMiddleware } = require("../middleware/isAdminMiddleware");

router.get("/", authMiddleware, getUserOrderHistoryController);
router.post("/", authMiddleware, createOrderValidator, createOrderController);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateOrderStatusValidator,
  updateUserOrderController,
);

router.put("/:id/cancel", authMiddleware, cancleUserOrderController);

module.exports = router;
