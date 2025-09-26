const ResearchStats = require('../models/ResearchStats');

// GET /api/research/stats
exports.getStats = async (req, res) => {
  try {
    const userId = req.user.id;
    let stats = await ResearchStats.findByUserId(userId);

    if (!stats) {
      // Initialize empty stats for the user if not present
      stats = new ResearchStats({ userId });
      await stats.save();
    }

    res.json({
      publications: stats.publications,
      citations: stats.citations,
      projects: stats.projects,
      lastUpdated: stats.lastUpdated,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/research/stats
exports.updateStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const { publications, citations, projects } = req.body;

    // Find existing stats or create new ones
    let stats = await ResearchStats.findByUserId(userId);
    
    if (!stats) {
      // Create new stats
      stats = new ResearchStats({ 
        userId,
        publications: publications || 0,
        citations: citations || 0,
        projects: projects || 0
      });
      await stats.save();
    } else {
      // Update existing stats
      const updates = {};
      if (publications !== undefined) updates.publications = publications;
      if (citations !== undefined) updates.citations = citations;
      if (projects !== undefined) updates.projects = projects;

      stats = await stats.update(updates);
    }

    res.json({
      message: 'Research stats updated successfully',
      stats: {
        publications: stats.publications,
        citations: stats.citations,
        projects: stats.projects,
        lastUpdated: stats.lastUpdated,
      },
    });
  } catch (error) {
    console.error('Update stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
