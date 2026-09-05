const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const {
  addToCartController,
  removeFromCartController,
  getCartByUserController,
} = require("../controllers/cartController");

router.get("/", authMiddleware, getCartByUserController);
router.post("/add", authMiddleware, addToCartController);
router.delete("/:productId", authMiddleware, removeFromCartController);

module.exports = router;
