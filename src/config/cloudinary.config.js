const cloudinary = require("cloudinary").v2;
const config = require("./env.config");

cloudinary.config({
  cloud_name: config.CLODINARY_KEY.CLOUDINARY_NAME,
  api_key: config.CLODINARY_KEY.CLOUDINARY_API_KEY,
  api_secret: config.CLODINARY_KEY.CLOUDINARY_SECRET,
});
module.exports = cloudinary;
