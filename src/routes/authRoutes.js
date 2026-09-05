const express = require("express");
const {
  createUserController,
  loginUserController,
  getProfileUserController,
} = require("../controllers/authController");
const expressValidation = require("../middleware/expressValidators");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post(
  "/register",
  expressValidation.registerValidator,
  createUserController,
);
router.post("/login", expressValidation.loginValidator, loginUserController);
router.get("/profile", authMiddleware, getProfileUserController);

module.exports = router;
