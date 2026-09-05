const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const {
  getUserOrderHistoryController,
  createOrderController,
} = require("../controllers/orderController");

router.get("/", authMiddleware, getUserOrderHistoryController);
router.post("/", authMiddleware, createOrderController);

module.exports = router;
