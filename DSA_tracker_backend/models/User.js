const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, 
  profileImage: {
    url: String,
    public_id: String,
  },
  googleId: { type: String },
  otp: String,
  otpExpiry: Date,
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);