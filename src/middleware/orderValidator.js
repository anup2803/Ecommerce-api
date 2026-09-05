const { check, validationResult } = require("express-validator");

const orderValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

const orderAddress = check("address")
  .notEmpty()
  .withMessage("Shipping address reference ID is required")
  .isMongoId()
  .withMessage("Address must be a valid MongoDB database ID");

const orderStatus = check("status")
  .optional()
  .isIn(["pending", "approved", "rejected"])
  .withMessage("Status must be either pending, approved, or rejected");

const orderProducts = check("products")
  .optional()
  .isArray({ min: 1 })
  .withMessage("Products field must be an array containing at least one item");

const orderProductItemId = check("products.*.product")
  .optional()
  .isMongoId()
  .withMessage("Each individual product must be a valid MongoDB database ID");

const orderProductQuantity = check("products.*.quantity")
  .optional()
  .isInt({ min: 1 })
  .withMessage("Quantity must be an integer and cannot be less than 1");

module.exports = {
  createOrderValidator: [
    orderAddress,
    orderProducts,
    orderProductItemId,
    orderProductQuantity,
    orderValidationResult,
  ],

  updateOrderStatusValidator: [orderStatus, orderValidationResult],
};
