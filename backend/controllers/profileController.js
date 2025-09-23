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

        res.json({ user, researchStats });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Update basic info
        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};