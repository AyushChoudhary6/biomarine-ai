const User = require('../models/User');
const ResearchStats = require('../models/ResearchStats');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Get research stats if user is a researcher
        let researchStats = null;
        if (user.userType === 'researcher') {
            researchStats = await ResearchStats.findByUserId(user.id);
        }

        // Create comprehensive profile response
        const profileResponse = {
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
            },
            researchStats: researchStats ? {
                publications: researchStats.publications,
                citations: researchStats.citations,
                projects: researchStats.projects,
                lastUpdated: researchStats.lastUpdated
            } : {
                publications: 0,
                citations: 0,
                projects: 0
            }
        };

        res.json(profileResponse);
    } catch (error) {
        console.error('Get profile error:', error);
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

        // Prepare update object
        const updates = {};
        if (name) updates.name = name;
        if (email) updates.email = email;
        if (phone) updates.phone = phone;
        if (country) updates.country = country;
        if (qualifications) updates.qualifications = qualifications;
        if (popularArticle !== undefined) updates.popularArticle = popularArticle;
        if (institute) updates.institute = institute;
        if (specialization !== undefined) updates.specialization = specialization;
        if (yearsOfExperience !== undefined) updates.yearsOfExperience = yearsOfExperience;
        if (researchInterests) updates.researchInterests = researchInterests;

        // Update user
        const updatedUser = await user.update(updates);

        res.json({ 
            message: 'Profile updated successfully', 
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                country: updatedUser.country,
                userType: updatedUser.userType,
                qualifications: updatedUser.qualifications,
                popularArticle: updatedUser.popularArticle,
                institute: updatedUser.institute,
                specialization: updatedUser.specialization,
                yearsOfExperience: updatedUser.yearsOfExperience,
                researchInterests: updatedUser.researchInterests,
                createdAt: updatedUser.createdAt
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
