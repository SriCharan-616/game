const express = require('express');
const Progress = require('../models/Progress');
const router = express.Router();

// Update user progress
router.post('/update', async (req, res) => {
    const { user, course, progressPercentage } = req.body;

    let progress = await Progress.findOne({ user, course });

    if (progress) {
        progress.progressPercentage = progressPercentage;
        progress.lastUpdated = new Date();
    } else {
        progress = new Progress({ user, course, progressPercentage });
    }

    await progress.save();
    res.json(progress);
});

module.exports = router;