const User = require('../models/User');
const ResearchStats = require('../models/ResearchStats');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Get research stats if user is a researcher
        let researchStats = null;
        if (user.userType === 'researcher') {
            researchStats = await ResearchStats.findOne({ userId: user._id });
        }

        // Create comprehensive profile response
        const profileResponse = {
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
            },
            researchStats: researchStats || {
                publications: 0,
                citations: 0,
                projects: 0
            }
        };

        res.json(profileResponse);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { 
            name, 
            email, 
            phone, 
            country, 
            qualifications, 
            popularArticle, 
            institute, 
            specialization, 
            yearsOfExperience, 
            researchInterests 
        } = req.body;
        
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Update user fields
        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (country) user.country = country;
        if (qualifications) user.qualifications = qualifications;
        if (popularArticle !== undefined) user.popularArticle = popularArticle;
        if (institute) user.institute = institute;
        if (specialization !== undefined) user.specialization = specialization;
        if (yearsOfExperience !== undefined) user.yearsOfExperience = yearsOfExperience;
        if (researchInterests) user.researchInterests = researchInterests;

        await user.save();

        // Return updated user data (excluding password)
        const updatedUser = await User.findById(user._id).select('-password');
        res.json({ 
            message: 'Profile updated successfully', 
            user: updatedUser 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};