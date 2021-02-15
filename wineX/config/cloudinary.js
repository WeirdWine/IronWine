// Not installed yet
const cloudniary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudniary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret:process.env.CLOUD_SECRET
})

const storeImg = new CloudinaryStorage({
  cloudinary: cloudniary,
  params: {
    folder: 'image-upload-wines',
    allowed_formats: 'jpg, png'
  }
})

const uploader = multer({ storeImg});

module.exports = {
  uploader: uploader,
  cloudinary: cloudniary
}