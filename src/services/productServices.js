const Product = require("../model/productModel");

module.exports = {
  createProductServices: async (data) => {
    try {
      const product = await Product.create(data);
      return product;
    } catch (error) {
      throw error;
    }
  },
  getProductServices: async () => {
    try {
      const result = await Product.find({})
        .populate("categories")
        .sort({ createdAt: -1 });
      return result;
    } catch (error) {
      throw error;
    }
  },
  getSingleProductServices: async (id) => {
    try {
      return await Product.findById(id).populate("categories");
    } catch (error) {
      throw error;
    }
  },
  editProductServices: async (id, data) => {
    try {
      return await Product.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      throw error;
    }
  },

  deleteProductServices: async (id) => {
    try {
      return await Product.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  },
};
