const Category = require("../model/categoryModel");

module.exports = {
  createCategoryServices: async (data) => {
    const result = await Category.create(data);
    return result;
  },
  getCategoryServices: async () => {
    const result = await Category.find({});
    return result;
  },
  editCategoryServices: async (id, data) => {
    try {
      const result = await Category.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  deleteCategoryServices: async (id) => {
    const result = await Category.findByIdAndDelete(id);
    return result;
  },
};
