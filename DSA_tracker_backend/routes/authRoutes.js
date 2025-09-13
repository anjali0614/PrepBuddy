const express = require("express");
const router = express.Router();
const { signup, login, sendOtp, resetPassword } = require("../auth/authController");
const googleAuthController = require("../auth/googleAuthController");
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", sendOtp);
router.post("/reset-password", resetPassword);
router.post("/google-signup", googleAuthController.googleSignup);
router.post("/google-login", googleAuthController.googleLogin);

module.exports = router;