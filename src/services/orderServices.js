const Order = require("../model/orderModel");

module.exports = {
  createOrderServices: async (data) => {
    try {
      const result = await Order.create(data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  getOrdersByUserIdServices: async (userId) => {
    try {
      const orders = await Order.find({ user: userId })
        .populate("products.product")
        .sort({ createdAt: -1 });

      return orders;
    } catch (error) {
      throw error;
    }
  },
  updateUserOrder: async (userId, orderId, data) => {
    try {
      const result = await Order.findOneAndUpdate(
        {
          user: userId,
          _id: orderId,
        },
        data,
        { new: true, runValidators: true },
      );

      if (!result) {
        throw {
          message:
            "Order could not be found or you are not authorized to update it.",
          status: 404,
        };
      }

      return result;
    } catch (error) {
      throw error;
    }
  },
  cancleOrderByUser: async (userId, orderId) => {
    try {
      const order = await Order.findOne({
        user: userId,
        _id: orderId,
      });

      if (!order) {
        throw {
          message: "Create a order first",
          status: 404,
        };
      }

      order.status = "cancelled";
      const cancleOrder = await order.save();

      return cancleOrder;
    } catch (error) {
      throw error;
    }
  },
};
