const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const transporter = require("../config/nodemailer");
const { uploadToCloudinary} = require("../utils/cloudinaryHelper");
const fs = require("fs");
const path = require("path");


exports.signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });
    
 var profileImage = {};

    // Handle profile picture upload
    if (req.files?.profilePic) {
      const file = req.files.profilePic;
     // Ensure temp folder exists
       const tempDir = path.join(__dirname, "temp");
       if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
       const tempPath = path.join(tempDir, file.name);

      // Save the file temporarily
      await file.mv(tempPath);

      // Upload to Cloudinary
      const result = await uploadToCloudinary(tempPath, "profiles");
      profileImage = {
        url: result.secure_url,
        public_id: result.public_id,
      };
      console.log(profileImage);

      // Delete local temp file
      fs.unlinkSync(tempPath);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ firstName, lastName, email, profileImage, password: hashedPassword, });
    
    // Send welcome mail
    await transporter.sendMail({
      from: `"Prep Buddy" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Welcome to Prep Buddy",
      html: `<h2>Hello ${firstName}, welcome to your Up Scale journey! 🎉</h2>`
    });

    return res.status(201).json({ message: "Signed up. Please login to continue." });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.password) return res.status(401).json({ message: "Incorrect user_id or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Incorrect user_id or password" });

    const token = generateToken(user._id);
    return res.json({ message: "Logged in successfully", token, user });
  } catch (err) {
    next(err);
  }
};

exports.sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = crypto.randomInt(100000, 999999).toString();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    await transporter.sendMail({
      from: `"Prep Buddy" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Reset your password",
      html: `<p>Your OTP code is: <strong>${otp}</strong></p>`
    });

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    await transporter.sendMail({
      from: `"Prep Buddy" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Password Updated",
      html: `<p>Your password has been updated successfully.</p>`
    });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    next(err);
  }
};
