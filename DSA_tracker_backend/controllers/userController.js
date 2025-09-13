const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const Sheet = require("../models/Sheet");
const { uploadToCloudinary, deleteFromCloudinary } = require("../utils/cloudinaryHelper");

exports.updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // fileupload
    if (req.files && req.files.profileImage) {
      // Remove old image if exists
      if (user.profileImage?.public_id) {
        await deleteFromCloudinary(user.profileImage.public_id);
      }

      // Save uploaded file to temp folder
      const file = req.files.profileImage;
       // Ensure temp folder exists
      const tempDir = path.join(__dirname, "temp");
      if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
      const tempPath = path.join(tempDir, file.name);

      // Move uploaded file to temp folder
      await file.mv(tempPath);

      // Upload to Cloudinary from tempPath
      const result = await uploadToCloudinary(tempPath, "profiles");
      user.profileImage = {
        url: result.secure_url,
        public_id: result.public_id,
      };

      // Remove temp file
      fs.unlinkSync(tempPath);
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    await user.save();

    res.json({ message: "Profile updated", user });
  } catch (err) {
    next(err);
  }
};


exports.deleteAccount = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Delete user profile image from Cloudinary if exists
    if (user.profileImage?.public_id) {
      await deleteFromCloudinary(user.profileImage.public_id);
    }

    // Delete all sheets associated with the user
    await Sheet.deleteMany({ user: user._id });

    // Delete the user
    await user.deleteOne();

    res.status(204).json({ message: "Account and all user data deleted." });
  } catch (err) {
    next(err);
  }
};
