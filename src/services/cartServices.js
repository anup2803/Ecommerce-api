const Cart = require("../model/cartModel");
const Product = require("../model/productModel");

module.exports = {
  getCartByUserId: async (userId) => {
    try {
      let cart = await Cart.findOne({ user: userId }).populate(
        "products.product",
      );

      if (!cart) {
        cart = await Cart.create({ user: userId, products: [] });
      }
      return cart;
    } catch (error) {
      throw error;
    }
  },

  addItemToCartServices: async (userId, productId, quantity) => {
    try {
      const productData = await Product.findById(productId);
      if (!productData) {
        throw { message: "Product not found", status: 404 };
      }

      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        cart = new Cart({ user: userId, products: [] });
      }

      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId.toString(),
      );

      let existingQuantityInCart = 0;
      if (productIndex > -1) {
        existingQuantityInCart = cart.products[productIndex].quantity;
      }

      const totalRequestedQuantity = existingQuantityInCart + quantity;

      if (totalRequestedQuantity > productData.stock) {
        throw {
          message: `Cannot add items. You have ${existingQuantityInCart} in cart, requesting ${quantity} more, but total stock available is only ${productData.stock}.`,
          status: 400,
        };
      }

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();
      return await cart.populate("products.product");
    } catch (error) {
      throw error;
    }
  },

  removeItemCartServices: async (userId, productId) => {
    try {
      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        throw { message: "Cart not found", status: 404 };
      }

      cart.products.filter((item) => {
        return item.product.toString() !== productId.toString();
      });

      await cart.save();
      return await cart.populate("products.product");
    } catch (error) {
      throw error;
    }
  },
};
