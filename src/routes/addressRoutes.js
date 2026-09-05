const express = require("express");
const {
  createAddressController,
  getUserAddressesController,
  editAddressController,
  deleteAddressController,
} = require("../controllers/addressController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createAddressController);
router.get("/", authMiddleware, getUserAddressesController);
router.put("/:id", authMiddleware, editAddressController);
router.delete("/:id", authMiddleware, deleteAddressController);

module.exports = router;
