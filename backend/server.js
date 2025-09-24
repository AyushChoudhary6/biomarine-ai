const express = require('express');
const cors = require('cors');
const passport = require('passport');
const connectDB = require('./config/database');
const helmet = require("helmet");
require('dotenv').config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000'],
}));
app.use(express.json());
app.use(passport.initialize());



app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:5000", "http://localhost:5173"], // allow API and dev server
    },
  })
);


// Configure Passport strategies
require('./strategies/jwtStrategy')(passport);
require('./strategies/googleStrategy')(passport);


// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/research', require('./routes/research'));

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

