const bcrypt = require("bcrypt");
const {
  creatUserServices,
  loginUserServices,
  getUserProfileServices,
} = require("../services/authServices");

//create a controller for the register
module.exports = {
  createUserController: async (req, res, next) => {
    try {
      const data = req.body;

      if (data.password !== data.confirmPassword) {
        return next({
          message: "Passwords do not match.",
          status: 400,
        });
      }
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(data?.password, saltRounds);

      const result = await creatUserServices({
        ...data,
        password: hashPassword,
      });

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          id: result._id,
          username: result.username,
          email: result.email,
          fullName: result.fullName,
        },
      });
    } catch (error) {
      return next(error);
    }
  },
  loginUserController: async (req, res, next) => {
    try {
      const data = req.body;
      const { user, token } = await loginUserServices(data);
      const checkPassword = await bcrypt.compare(data?.password, user.password);
      if (!checkPassword) {
        return next({
          message: "Invalid credentials.",
          status: 401,
        });
      }
      return res.status(200).json({
        success: true,
        message: `Welcome back, ${user.username}!`,
        token: token,
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
      });
    } catch (error) {
      return next(error);
    }
  },
  getProfileUserController: async (req, res, next) => {
    try {
      const userId = req.userId;
      const user = await getUserProfileServices(userId);

      return res.status(200).json({
        success: true,
        message: `User profile fetch successfully!`,
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
      });
    } catch (error) {
      return next(error);
    }
  },
};
