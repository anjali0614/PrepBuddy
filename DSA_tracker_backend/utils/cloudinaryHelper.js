const { cloudinary } = require("../config/cloudinary");

exports.uploadToCloudinary = async (filePath, folder) => {
  try {
    return await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "auto",
      quality: "auto:eco",
    });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};

exports.deleteFromCloudinary = async (publicId) => {
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error(" Cloudinary Delete Error:", error);
    throw error;
  }
};
