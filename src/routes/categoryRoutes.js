const express = require("express");
const {
  createCategoryController,
  getCategoryController,
  editCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");
const { authMiddleware } = require("../middleware/authMiddleware");
const categoryValidator = require("../middleware/categoryValidator");
const { adminMiddleware } = require("../middleware/isAdminMiddleware");
const router = express.Router();

//public categories
router.get("/", getCategoryController);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  categoryValidator.createCategoryValidator,
  createCategoryController,
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  categoryValidator.updateCategoryValidator,
  editCategoryController,
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteCategoryController,
);

module.exports = router;
