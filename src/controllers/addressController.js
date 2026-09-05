const {
  createAddressServices,
  getAddressesByUserIdServices,
  updateAddressServices,
  deleteAddressServices,
} = require("../services/addressServices");

module.exports = {
  createAddressController: async (req, res, next) => {
    try {
      const data = req.body;
      const userId = req.userId;

      if (!userId) {
        return res
          .status(401)
          .json({ success: false, message: "Authentication required." });
      }

      const fullAddressPayload = { ...data, user: userId };
      const newAddress = await createAddressServices(fullAddressPayload);

      return res.status(201).json({
        success: true,
        message: "Address added successfully!",
        data: newAddress,
      });
    } catch (error) {
      return next(error);
    }
  },

  getUserAddressesController: async (req, res, next) => {
    try {
      const userId = req.userId;
      const addresses = await getAddressesByUserIdServices(userId);

      return res.status(200).json({
        success: true,
        count: addresses.length,
        data: addresses,
      });
    } catch (error) {
      return next(error);
    }
  },

  editAddressController: async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.userId;
      const updateData = req.body;

      const updatedAddress = await updateAddressServices(
        id,
        userId,
        updateData,
      );
      if (!updatedAddress) {
        return next({
          status: 404,
          success: false,
          message: "Address not found or unauthorized.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Address updated successfully!",
        data: updatedAddress,
      });
    } catch (error) {
      return next(error);
    }
  },

  deleteAddressController: async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.userId;

      const deletedAddress = await deleteAddressServices(id, userId);
      if (!deletedAddress) {
        return next({
          status: 404,
          success: false,
          message: "Address not found or unauthorized.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Address deleted successfully!",
      });
    } catch (error) {
      return next(error);
    }
  },
};
