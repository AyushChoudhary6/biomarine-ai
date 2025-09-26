const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // Remove deprecated options
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        console.log('Please ensure MongoDB is running or use MongoDB Atlas');
        // Don't exit process in development, just log the error
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
};

module.exports = connectDB;