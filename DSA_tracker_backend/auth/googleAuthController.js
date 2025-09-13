const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const transporter = require("../config/nodemailer");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleSignup = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ message: "No idToken provided" });

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // 1. Explicit SignUp: user should not exist
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists, please login." });
    }

    user = await User.create({
      email,
      firstName: name?.split(" ")[0] || "",
      lastName: name?.split(" ").slice(1).join(" ") || "",
      profileImage: { url: picture, public_id: null }
    });

    // Send welcome mail
     transporter.sendMail({
      from: `"Prep Buddy" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Welcome to Prep Buddy",
      html: `<h2>Hello , welcome to your Up Scale journey! 🎉</h2>`
    });

    const token = generateToken(user._id);
    return res.status(201).json({
      message: "Signed up with Google successfully.",
      token,
      user
    });
  } catch (err) {
    next(err);
  }
};

exports.googleLogin = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ message: "No idToken provided" });

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email } = payload;

    // 2. Explicit Login: user must exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist, please sign up first." });
    }

    const token = generateToken(user._id);
    return res.json({
      message: "Logged in with Google successfully.",
      token,
      user
    });
  } catch (err) {
    next(err);
  }
};
