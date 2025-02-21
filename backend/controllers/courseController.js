const Course = require("../models/Course");

// Create Course
exports.createCourse = async (req, res) => {
  const { title, description, price, nftRequired } = req.body;
  try {
    const course = await Course.create({ title, description, price, nftRequired, creator: req.user.id });
    res.json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Courses
exports.getCourses = async (req, res) => {
  const courses = await Course.find().populate("creator", "name email");
  res.json(courses);
};
