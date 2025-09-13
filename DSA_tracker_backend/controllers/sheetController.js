const Sheet = require("../models/Sheet");

exports.createSheet = async (req, res, next) => {
  try {
    const { title } = req.body;
    const sheet = await Sheet.create({ user: req.user._id, title, steps: [] });
    res.status(201).json({ message: "Sheet created", sheet });
  } catch (err) {
    next(err);
  }
};

exports.getAllSheets = async (req, res, next) => {
  try {
    const sheets = await Sheet.find({ user: req.user._id });
    res.json({ sheets });
  } catch (err) {
    next(err);
  }
};

exports.getSheetById = async (req, res, next) => {
  try {
    const sheet = await Sheet.findOne({ _id: req.params.id, user: req.user._id });
    if (!sheet) return res.status(404).json({ message: "Sheet not found" });
    res.json({ sheet });
  } catch (err) {
    next(err);
  }
};

exports.updateSheet = async (req, res, next) => {
  try {
    const sheet = await Sheet.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!sheet) return res.status(404).json({ message: "Sheet not found" });
    res.json({ message: "Sheet updated", sheet });
  } catch (err) {
    next(err);
  }
};

exports.deleteSheet = async (req, res, next) => {
  try {
    const sheet = await Sheet.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!sheet) return res.status(404).json({ message: "Sheet not found" });
    res.json({ message: "Sheet deleted" });
  } catch (err) {
    next(err);
  }
};