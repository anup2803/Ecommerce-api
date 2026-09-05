const { check, validationResult } = require("express-validator");

const categoryValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

const categoriesName = check("name")
  .notEmpty()
  .withMessage("Category name is required")
  .isString()
  .withMessage("Name must be a valid string value")
  .trim();

const categoriesSlug = check("slug")
  .optional()
  .isString()
  .withMessage("Slug must be a string value")
  .trim();

const categoriesDescription = check("description")
  .optional()
  .isString()
  .withMessage("Description must be a string value")
  .trim();

module.exports = {
  createCategoryValidator: [
    categoriesName,
    categoriesDescription,
    categoryValidationResult,
  ],

  updateCategoryValidator: [
    categoriesName.optional(),
    categoriesSlug,
    categoriesDescription,
    categoryValidationResult,
  ],
};
