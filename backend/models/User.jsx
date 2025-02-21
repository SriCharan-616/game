const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    walletAddress: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    completedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    nftCertificates: [{ type: String }], // Store NFT contract addresses
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);