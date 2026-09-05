const User = require("../model/userModel");
const { generateToke, generateToken } = require("../utils/generateToke");
module.exports = {
  creatUserServices: async (data) => {
    try {
      const existingUser = await User.findOne({ email: data?.email });
      if (existingUser) {
        throw {
          message: "Email is already registered.",
          status: 400,
        };
      }

      const existingUsername = await User.findOne({ username: data?.username });
      if (existingUsername) {
        throw {
          message: "Username is already taken.",
          status: 400,
        };
      }

      const createUser = await User.create(data);
      return createUser;
    } catch (error) {
      throw error;
    }
  },
  loginUserServices: async (data) => {
    try {
      const user = await User.findOne({ email: data?.email });
      if (!user) {
        throw {
          message: "Invalid credentials.",
          status: 401,
        };
      }

      const token = await generateToken(user._id);

      return {
        user,
        token,
      };
    } catch (error) {
      throw error;
    }
  },
  getUserProfileServices: async (id) => {
    try {
      const user = await User.findOne({ _id: id });
      if (!user) {
        throw {
          message: "Unauthorized user !",
          status: 401,
        };
      }

      return user;
    } catch (error) {
      throw error;
    }
  },
};
