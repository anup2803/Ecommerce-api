const { getCartByUserId } = require("../services/cartServices");
const {
  createOrderServices,
  getOrdersByUserIdServices,
  updateUserOrder,
  cancleOrderByUser,
} = require("../services/orderServices");
const { editProductServices } = require("../services/productServices");

module.exports = {
  createOrderController: async (req, res, next) => {
    try {
      const data = req.body;
      const userId = req.userId;

      if (!userId) {
        return next({
          status: 401,
          success: false,
          message: "You must be logged in to place an order.",
        });
      }

      const userCart = await getCartByUserId(userId);
      if (!userCart || !userCart.products || userCart.products.length === 0) {
        return next({
          status: 400,
          success: false,
          message: "Your cart is empty. Add products before checking out.",
        });
      }

      let calculatedTotal = 0;
      const finalizedOrderProducts = [];

      for (const item of userCart.products) {
        if (!item.product) {
          return next({
            success: false,
            status: 404,
            message:
              "One of the items in your cart is no longer available in our catalog.",
          });
        }

        if (item.product.stock < item.quantity) {
          return next({
            status: 400,
            success: false,
            message: `Insufficient stock for product: ${item.product.title}. Only ${item.product.stock} items left.`,
          });
        }

        const itemPrice = item.product.price;
        calculatedTotal += itemPrice * item.quantity;

        finalizedOrderProducts.push({
          product: item.product._id,
          quantity: item.quantity,
          priceAtPurchase: itemPrice,
        });

        await editProductServices(item.product._id, {
          $inc: { stock: -item.quantity },
        });
      }

      const completedOrderData = {
        user: userId,
        products: finalizedOrderProducts,
        address: data.address,
        totalAmount: calculatedTotal,
        status: "pending",
      };

      const newOrder = await createOrderServices(completedOrderData);
      userCart.products = [];
      await userCart.save();

      return res.status(201).json({
        success: true,
        message: "Order placed successfully!",
        data: newOrder,
      });
    } catch (error) {
      return next(error);
    }
  },
  getUserOrderHistoryController: async (req, res, next) => {
    try {
      const userId = req.userId;
      const orders = await getOrdersByUserIdServices(userId);

      return res.status(200).json({
        success: true,
        count: orders ? orders.length : 0,
        data: orders,
      });
    } catch (error) {
      return next(error);
    }
  },
  updateUserOrderController: async (req, res, next) => {
    try {
      const data = req.body;
      const userId = req.userId;
      const { id } = req.params;

      const updatedOrder = await updateUserOrder(userId, id, data);
      return res.status(200).json({
        success: true,
        message: "Order updated successfully!",
        data: updatedOrder,
      });
    } catch (error) {
      return next(error);
    }
  },
  cancleUserOrderController: async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.userId;

      const canceledOrder = await cancleOrderByUser(userId, id);

      if (canceledOrder && canceledOrder.products) {
        for (const item of canceledOrder.products) {
          await editProductServices(item.product, {
            $inc: { stock: item.quantity },
          });
        }
      }
      return res.status(200).json({
        success: true,
        message: `Order has been cancelled and items restocked successfully.`,
        data: canceledOrder,
      });
    } catch (error) {
      return next(error);
    }
  },
};
