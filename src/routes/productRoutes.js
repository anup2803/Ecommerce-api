const express = require("express");
const {
  createProductController,
  getProductController,
  getSingleProductController,
  deleteProductController,
  editProductController,
} = require("../controllers/productController");
const { authMiddleware } = require("../middleware/authMiddleware");
const productValidator = require("../middleware/productValidator");
const router = express.Router();
const upload = require("../middleware/multerMiddleware");
const { adminMiddleware } = require("../middleware/isAdminMiddleware");

//public routes
router.get("/", getProductController);
router.get("/:id", getSingleProductController);

//protected
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("img"),
  productValidator.createProductValidator,
  createProductController,
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("img"),
  productValidator.updateProductValidator,
  editProductController,
);

router.delete("/:id", authMiddleware, adminMiddleware, deleteProductController);

module.exports = router;
