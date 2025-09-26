const express = require('express');
const cors = require('cors');
const passport = require('passport');
const { connectDB } = require('./config/database');
const helmet = require("helmet");
require('dotenv').config();

// Initialize Express app
const app = express();

// Connect to DynamoDB
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

// Root route - Health check
app.get('/', (req, res) => {
  res.json({
    message: 'Biomarine AI Backend API',
    status: 'running',
    version: '1.0.0',
    database: 'DynamoDB (us-west-2)',
    endpoints: {
      auth: '/api/auth',
      profile: '/api/profile',
      research: '/api/research'
    }
  });
});

// API status route
app.get('/api', (req, res) => {
  res.json({
    message: 'API is running',
    timestamp: new Date().toISOString(),
    database: 'DynamoDB connected (us-west-2)',
    region: process.env.AWS_REGION || 'us-west-2'
  });
});

// Health check endpoint for Kubernetes
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Configure Passport strategies
require('./strategies/jwtStrategy')(passport);
require('./strategies/googleStrategy')(passport);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/research', require('./routes/research'));

// Error handling middleware
app.use((err, req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Using DynamoDB in region: ${process.env.AWS_REGION || 'us-west-2'}`);
});
