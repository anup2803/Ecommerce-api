const jwt = require("jsonwebtoken");
const config = require("../config/env.config");

module.exports = {
  generateToken: (userId) => {
    const secretKey = config.JWT_SECRET.secret;
    return jwt.sign({ id: userId }, secretKey, {
      expiresIn: "1d",
    });
  },
};
