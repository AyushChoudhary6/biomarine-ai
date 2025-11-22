const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Google OAuth routes
router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    try {
      // Generate JWT token for the user
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      });

      // Redirect to frontend with token
      const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
      res.redirect(`${frontendURL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        country: req.user.country,
        userType: req.user.userType,
        qualifications: req.user.qualifications,
        popularArticle: req.user.popularArticle,
        institute: req.user.institute,
        specialization: req.user.specialization,
        yearsOfExperience: req.user.yearsOfExperience,
        researchInterests: req.user.researchInterests,
        createdAt: req.user.createdAt
      }))}`);
    } catch (error) {
      console.error('Google OAuth callback error:', error);
      const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
      res.redirect(`${frontendURL}/login?error=oauth_failed`);
    }
  }
);

module.exports = router;