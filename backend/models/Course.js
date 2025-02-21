const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  price: Number,
  nftRequired: { type: Boolean, default: false },
});

module.exports = mongoose.model("Course", CourseSchema);
