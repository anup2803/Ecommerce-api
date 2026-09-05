const { check, validationResult } = require("express-validator");

const productValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

const productTitle = check("title")
  .notEmpty()
  .withMessage("Product title is required")
  .trim();

const productDescription = check("description")
  .notEmpty()
  .withMessage("Product description is required")
  .trim();

const productImage = check("img").custom((value, { req }) => {
  if (!req.file && !value) {
    throw new Error("Product image URL or file is required");
  }
  return true;
});

const productImagePublicId = check("imgPublicId")
  .optional()
  .isString()
  .withMessage("Image public ID must be a valid text string");

const productCategories = check("categories")
  .notEmpty()
  .withMessage("Categories field cannot be empty")
  .isMongoId()
  .withMessage("Every category must be a valid MongoDB database ID");

const productStock = check("stock")
  .notEmpty()
  .withMessage("Stock count is required")
  .isInt({ min: 0 })
  .withMessage("Stock must be an integer and cannot be a negative number");

const productActive = check("active")
  .optional()
  .isBoolean()
  .withMessage("Active field must be a true or false value");

const productSize = check("size")
  .optional()
  .isArray()
  .withMessage("Size must be sent as an array or list");

const productColor = check("color")
  .optional()
  .isArray()
  .withMessage("Color must be sent as an array or list");

const productPrice = check("price")
  .notEmpty()
  .withMessage("Product price is required")
  .isFloat({ min: 0 })
  .withMessage("Price must be a valid number and cannot be negative");

module.exports = {
  createProductValidator: [
    productTitle,
    productDescription,
    productImage,
    productCategories,
    productStock,
    productActive,
    productSize,
    productColor,
    productPrice,
    productImagePublicId,
    productValidationResult,
  ],

  updateProductValidator: [
    productTitle.optional(),
    productDescription.optional(),
    productImage.optional(),
    productCategories.optional(),
    productStock.optional(),
    productActive.optional(),
    productSize.optional(),
    productColor.optional(),
    productPrice.optional(),
    productImagePublicId.optional(),
    productValidationResult,
  ],
};
