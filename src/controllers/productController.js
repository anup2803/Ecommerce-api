const {
  createProductServices,
  getProductServices,
  editProductServices,
  deleteProductServices,
  getSingleProductServices,
} = require("../services/productServices");

const cloudinary = require("../config/cloudinary.config");
//create a product
module.exports = {
  createProductController: async (req, res, next) => {
    try {
      const data = req.body;
      if (!req.file) {
        return next({
          message: "Image should be required",
          status: 400,
        });
      }

      data.img = req.file.path;
      data.imgPublicId = req.file.filename;

      const product = await createProductServices(data);

      return res.status(201).json({
        success: true,
        message: `Product ${product.title} created successfully!`,
        data: {
          id: product._id,
          title: product.title,
          description: product.description,
          img: product.img,
          categories: product.categories,
          stock: product.stock,
          active: product.active,
          size: product.size,
          color: product.color,
          price: product.price,
        },
      });
    } catch (error) {
      return next(error);
    }
  },
  getProductController: async (req, res, next) => {
    try {
      const products = await getProductServices();
      return res.status(200).json({
        success: true,
        count: products.length,
        message: "Products fetched successfully!",
        data: products,
      });
    } catch (error) {
      return next(error);
    }
  },
  getSingleProductController: async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await getSingleProductServices(id);

      if (!product) {
        return next({ message: "Product not found", status: 404 });
      }
      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      return next(error);
    }
  },
  editProductController: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;

      if (req.file) {
        const currentProduct = await getSingleProductServices(id);
        if (!currentProduct) {
          return next({ message: "Product not found", status: 404 });
        }

        if (currentProduct.imgPublicId) {
          await cloudinary.uploader.destroy(currentProduct.imgPublicId);
        }

        data.img = req.file.path;
        data.imgPublicId = req.file.filename;
      }

      const updatedProduct = await editProductServices(id, data);
      if (!updatedProduct) {
        return next({ message: "Product not found", status: 404 });
      }
      return res.status(200).json({
        success: true,
        message: "Product updated successfully!",
        data: updatedProduct,
      });
    } catch (error) {
      return next(error);
    }
  },
  deleteProductController: async (req, res, next) => {
    try {
      const { id } = req.params;

      const currentProduct = await getSingleProductServices(id);
      if (!currentProduct) {
        return next({ message: "Product not found", status: 404 });
      }

      if (currentProduct.imgPublicId) {
        await cloudinary.uploader.destroy(currentProduct.imgPublicId);
      }

      await deleteProductServices(id);

      return res.status(200).json({
        success: true,
        message: `Product ${currentProduct.title} was deleted successfully.`,
      });
    } catch (error) {
      return next(error);
    }
  },
};
