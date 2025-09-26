const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validateRegistration } = require('../middleware/validation');

exports.register = async (req, res) => {
    try {
        // Validate request body for registration (phone required)
        const { error } = validateRegistration(req.body);
        if (error) {
            console.error('Validation error:', error.details[0].message);
            return res.status(400).json({ message: error.details[0].message });
        }

        // Check if user already exists by email
        let existingUser = await User.findByEmail(req.body.email);
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Create new user
        const user = new User(req.body);
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.status(201).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                country: user.country,
                userType: user.userType,
                qualifications: user.qualifications,
                popularArticle: user.popularArticle,
                institute: user.institute,
                specialization: user.specialization,
                yearsOfExperience: user.yearsOfExperience,
                researchInterests: user.researchInterests,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        
        // Handle DynamoDB errors
        if (error.message.includes('already exists')) {
            return res.status(400).json({ 
                message: error.message 
            });
        }
        
        res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findByEmail(email);
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                country: user.country,
                userType: user.userType,
                qualifications: user.qualifications,
                popularArticle: user.popularArticle,
                institute: user.institute,
                specialization: user.specialization,
                yearsOfExperience: user.yearsOfExperience,
                researchInterests: user.researchInterests,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
