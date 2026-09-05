require("dotenv").config();

module.exports = {
  PORT: {
    port: process.env.PORT,
  },
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: {
    secret: process.env.JWT_SECRET,
  },
  CLODINARY_KEY: {
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
  },
};
