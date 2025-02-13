const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "cloudName",
  api_key: "ApiKey",
  api_secret: "secret",
});

module.exports = cloudinary;
