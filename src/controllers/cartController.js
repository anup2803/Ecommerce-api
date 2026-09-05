const {
  getCartByUserId,
  addItemToCartServices,
  removeItemCartServices,
} = require("../services/cartServices");

module.exports = {
  getCartByUserController: async (req, res, next) => {
    try {
      const userId = req.userId;
      if (!userId) {
        return next({
          message: "User must be logged-in",
          status: 401,
        });
      }

      const cart = await getCartByUserId(userId);
      return res.status(200).json({
        success: true,
        data: cart,
      });
    } catch (error) {
      return next(error);
    }
  },
  addToCartController: async (req, res, next) => {
    try {
      const userId = req.userId;
      const { product, quantity } = req.body;

      const updatedCart = await addItemToCartServices(
        userId,
        product,
        Number(quantity || 1),
      );

      return res.status(200).json({
        success: true,
        message: "Item added to cart successfully",
        data: updatedCart,
      });
    } catch (error) {
      return next(error);
    }
  },
  removeFromCartController: async (req, res, next) => {
    try {
      const userId = req.userId;
      const { productId } = req.params;
      const updatedCart = await removeItemCartServices(userId, productId);

      return res.status(200).json({
        success: true,
        message: "Item removed from cart successfully",
        data: updatedCart,
      });
    } catch (error) {
      return next(error);
    }
  },
};
