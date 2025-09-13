const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createSheet,
  getAllSheets,
  getSheetById,
  updateSheet,
  deleteSheet,
} = require("../controllers/sheetController");

router.use(authMiddleware);
router.post("/create", createSheet);
router.get("/", getAllSheets);
router.get("/:id", getSheetById);
router.put("/:id", updateSheet);
router.delete("/:id", deleteSheet);

module.exports = router;
