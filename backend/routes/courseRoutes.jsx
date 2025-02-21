const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
});

// Create a new course
router.post('/', async (req, res) => {
    const { title, description, content, difficulty, nftReward, creator } = req.body;

    const course = new Course({ title, description, content, difficulty, nftReward, creator });
    await course.save();

    res.json(course);
});

module.exports = router;