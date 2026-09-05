const {
  createCategoryServices,
  editCategoryServices,
  deleteCategoryServices,
  getCategoryServices,
} = require("../services/categoryServices");

module.exports = {
  //create category
  createCategoryController: async (req, res, next) => {
    try {
      const data = req.body;
      const categories = await createCategoryServices(data);
      return res.status(201).json({
        success: true,
        message: `Category ${categories.name} created successfully!`,
        data: {
          id: categories._id,
          name: categories.name,
          description: categories.description,
          slug: categories.slug,
          active: categories.active,
        },
      });
    } catch (error) {
      return next(error);
    }
  },
  getCategoryController: async (req, res, next) => {
    try {
      const categories = await getCategoryServices();
      return res.status(200).json({
        success: true,
        count: categories.length,
        data: categories,
      });
    } catch (error) {
      return next(error);
    }
  },
  editCategoryController: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedCategory = await editCategoryServices(id, data);
      return res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: updatedCategory,
      });
    } catch (error) {
      return next(error);
    }
  },
  deleteCategoryController: async (req, res, next) => {
    try {
      const { id } = req.params;

      const deletedCategory = await deleteCategoryServices(id);
      if (!deletedCategory) {
        return next({ message: "Category not found", status: 404 });
      }

      return res.status(200).json({
        success: true,
        message: `Category ${deletedCategory.name} deleted successfully`,
      });
    } catch (error) {
      return next(error);
    }
  },
};
