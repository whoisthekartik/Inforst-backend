// src/routes/exampleRoute.js
const express = require('express');
const router = express.Router();
const cacheMiddleware = require('../middleware/cacheMiddleware');
const redisService = require('../services/redisService');

// Example route that caches data
router.get('/leaderboard', cacheMiddleware, async (req, res) => {
  const leaderboardData = await getLeaderboardData(); // Your data-fetching logic
  
  // Cache the leaderboard data for 1 hour (3600 seconds)
  redisService.setCache(req.originalUrl, leaderboardData, 3600);
  res.json(leaderboardData);
});

async function getLeaderboardData() {
  // Logic to fetch leaderboard data, e.g., from the database
  return [
    { name: 'Player1', score: 1000 },
    { name: 'Player2', score: 800 },
  ];
}

module.exports = router;