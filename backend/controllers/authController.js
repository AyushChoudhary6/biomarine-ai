const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validateUser } = require('../middleware/validation');

exports.register = async (req, res) => {
    try {
        // Validate request body
        const { error } = validateUser(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        // Check if user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        // Create new user
        user = new User(req.body);
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.status(201).json({
            token,
            user: {
                id: user._id,
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
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.json({
            token,
            user: {
                id: user._id,
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
        res.status(500).json({ message: 'Server error' });
    }
};