const express = require('express');
const router = express.Router();
const battleController = require('../controllers/battleController');

// Proper route definitions
router.post('/start', battleController.startBattle);
router.post('/attack', battleController.handleAttack);
router.get('/results/:battleId', battleController.getBattleResults);

// Make sure to export the router
module.exports = router;