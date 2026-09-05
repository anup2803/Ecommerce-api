const jwt = require("jsonwebtoken");
const config = require("../config/env.config");

module.exports = {
  authMiddleware: async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next({
          message: "Access denied. No token provided.",
          status: 401,
        });
      }

      const token = authHeader.split(" ")[1];

      const decoded = await jwt.verify(token, config.JWT_SECRET.secret);

      req.userId = decoded.id;
      next();
    } catch (error) {
      return next({
        message: "Invalid or expired token.",
        status: 401,
      });
    }
  },
};
