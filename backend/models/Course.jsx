const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String }, // Could be an IPFS URL
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    nftReward: { type: String }, // NFT contract address
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);