// src/routes/index.js
const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');

// Define API routes
router.get('/leaderboard', leaderboardController.getLeaderboard);

module.exports = router;