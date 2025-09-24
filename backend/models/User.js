const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 15
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    country: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['student', 'researcher'],
        required: true
    },
    // Researcher-specific fields
    qualifications: {
        type: String,
        required: function() { return this.userType === 'researcher'; }
    },
    popularArticle: {
        type: String
    },
    institute: {
        type: String,
        required: function() { return this.userType === 'researcher'; }
    },
    specialization: {
        type: String
    },
    yearsOfExperience: {
        type: Number,
        default: 0
    },
    researchInterests: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method for compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);