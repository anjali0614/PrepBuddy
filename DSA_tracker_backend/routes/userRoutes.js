const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { updateProfile, deleteAccount } = require("../controllers/userController");

router.put("/update-profile", authMiddleware, updateProfile);
router.delete("/delete-account", authMiddleware, deleteAccount);

module.exports = router;
