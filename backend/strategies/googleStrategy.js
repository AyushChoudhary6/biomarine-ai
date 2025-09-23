const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

module.exports = passport => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/auth/google/callback'
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    // Check if user exists
                    let user = await User.findOne({ email: profile.emails[0].value });

                    if (user) {
                        return done(null, user);
                    }

                    // If not, create new user
                    user = new User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: 'google-auth', // You might want to handle this differently
                        userType: 'student' // Default type, can be changed later
                    });

                    await user.save();
                    done(null, user);
                } catch (error) {
                    done(error, null);
                }
            }
        )
    );
};