const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    progressPercentage: { type: Number, default: 0 }, // 0-100%
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Progress', ProgressSchema);