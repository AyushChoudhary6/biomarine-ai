const ResearchStats = require('../models/ResearchStats');

// GET /api/research/stats
exports.getStats = async (req, res) => {
  try {
    const userId = req.user.id;
    let stats = await ResearchStats.findOne({ userId });

    if (!stats) {
      // Initialize empty stats for the user if not present
      stats = await ResearchStats.create({ userId });
    }

    res.json({
      publications: stats.publications,
      citations: stats.citations,
      projects: stats.projects,
      lastUpdated: stats.lastUpdated,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/research/stats
exports.updateStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const { publications, citations, projects } = req.body;

    const updates = {};
    if (publications !== undefined) updates.publications = publications;
    if (citations !== undefined) updates.citations = citations;
    if (projects !== undefined) updates.projects = projects;
    updates.lastUpdated = new Date();

    const stats = await ResearchStats.findOneAndUpdate(
      { userId },
      { $set: updates },
      { new: true, upsert: true }
    );

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
    res.status(500).json({ message: 'Server error' });
  }
};
