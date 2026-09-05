const { check, validationResult } = require("express-validator");

const validateResultHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

// Reusable individual rules
const emailCheck = check("email")
  .isEmail()
  .withMessage("Please include a valid email");

const usernameCheck = check("username")
  .notEmpty()
  .withMessage("Username is required")
  .isAlphanumeric()
  .withMessage("Username must contain only letters and numbers")
  .trim();

const passwordCheck = check("password")
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters long");

const fullNameCheck = check("fullName")
  .notEmpty()
  .withMessage("Full name is required")
  .trim();

module.exports = {
  registerValidator: [
    emailCheck,
    usernameCheck,
    passwordCheck,
    fullNameCheck,
    validateResultHandler,
  ],
  loginValidator: [emailCheck, passwordCheck, validateResultHandler],
};
