const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = passport => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/api/auth/google/callback'
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    // Check if user exists
                    let user = await User.findByEmail(profile.emails[0].value);

                    if (user) {
                        return done(null, user);
                    }

                    // Generate a random password for Google OAuth users
                    const randomPassword = Math.random().toString(36).slice(-8);
                    const hashedPassword = await bcrypt.hash(randomPassword, 10);

                    // If not, create new user with required fields
                    user = new User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: hashedPassword,
                        phone: null, // Will be set by user later
                        country: 'Unknown', // Placeholder - user can update later
                        userType: 'student' // Default type, can be changed later
                    });

                    await user.save();
                    done(null, user);
                } catch (error) {
                    console.error('Google OAuth error:', error);
                    done(error, null);
                }
            }
        )
    );
};
