const User = require("../model/userModel");

module.exports = {
  adminMiddleware: async (req, res, next) => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Access denied. User ID not found in request context.",
        });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Access denied. User account no longer exists.",
        });
      }

      if (user.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Access denied. Admin privileges required.",
        });
      }
      next();
    } catch (error) {
      return next(error);
    }
  },
};
