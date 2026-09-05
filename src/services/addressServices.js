const Address = require("../model/addressModel");

module.exports = {
  createAddressServices: async (data) => {
    try {
      const result = await Address.create(data);
      return result;
    } catch (error) {
      throw error;
    }
  },

  getAddressesByUserIdServices: async (userId) => {
    try {
      return await Address.find({ user: userId }).sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  },

  updateAddressServices: async (addressId, userId, updateData) => {
    try {
      return await Address.findOneAndUpdate(
        { _id: addressId, user: userId },
        updateData,
        { new: true, runValidators: true },
      );
    } catch (error) {
      throw error;
    }
  },

  deleteAddressServices: async (addressId, userId) => {
    try {
      return await Address.findOneAndDelete({ _id: addressId, user: userId });
    } catch (error) {
      throw error;
    }
  },
};
