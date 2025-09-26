const mongoose = require('mongoose');

const researchStatsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    publications: {
        type: Number,
        default: 0
    },
    citations: {
        type: Number,
        default: 0
    },
    projects: {
        type: Number,
        default: 0
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ResearchStats', researchStatsSchema);