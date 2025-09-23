const express = require('express');
const cors = require('cors');
const passport = require('passport');
const connectDB = require('./config/database');
require('dotenv').config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Configure Passport strategies
require('./strategies/jwtStrategy')(passport);
require('./strategies/googleStrategy')(passport);
require('./strategies/linkedinStrategy')(passport);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});