const express = require('express');
const router = express.Router();
const researchController = require('../controllers/researchController');
const auth = require('../middleware/auth');

// Protected routes for research stats
router.get('/stats', auth, researchController.getStats);
router.put('/stats', auth, researchController.updateStats);

module.exports = router;
