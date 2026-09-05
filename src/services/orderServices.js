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
};
