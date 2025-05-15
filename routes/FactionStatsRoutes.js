const express = require('express');
const router = express.Router();
const factionStatsController = require('../controllers/factionStatsController');

router.get('/', factionStatsController.getAllFactionStats);

module.exports = router;