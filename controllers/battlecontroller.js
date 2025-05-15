const Battle = require('../models/Battle');
const Player = require('../models/Player');
const NFT = require('../models/NFT');
const BattleEngine = require('../utils/battleEngine');


const { addInfluencePoints } = require('../services/factionInfluenceService');

async function handleBattleWin(req, res) {
  try {
    const player = req.user; // Assuming middleware sets req.user
    const faction = player.faction; // "Frostborn" or "Infernos"
    const points = 10;

    const result = await addInfluencePoints(faction, points);

    if (result) {
      res.json({
        message: 'Battle won. Faction influence updated.',
        influence: result
      });
    } else {
      res.status(500).json({ error: 'Failed to update faction influence.' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Battle logic error' });
  }
}

module.exports = { handleBattleWin };


const battleController = {
  // Initiate PvP battle
  startBattle: async (req, res) => {
    try {
      const { opponentId, nftId } = req.body;
      const [player, opponent, nft] = await Promise.all([
        Player.findById(req.player._id), // Changed to _id
        Player.findById(opponentId),
        NFT.findById(nftId)
      ]);

      // Validate battle participants (fixed condition)
      if (!opponent || nft.owner.toString() !== player._id.toString()) {
        return res.status(400).json({
          success: false,
          error: 'Invalid battle request - Check participant or NFT ownership'
        });
      }

      // Get actual NFT instances
      const playerNFT = player.nfts.find(n => n._id.toString() === nftId);
      const opponentNFT = opponent.nfts[0];

      if (!playerNFT || !opponentNFT) {
        return res.status(400).json({
          success: false,
          error: 'Selected NFTs not found'
        });
      }

      // Simulate battle
      const battleResult = BattleEngine.simulateCombat(playerNFT, opponentNFT);

      // Record battle
      const battleRecord = new Battle({
        participants: [player._id, opponent._id],
        winner: battleResult.winner,
        loser: battleResult.loser,
        damageDealt: battleResult.damage,
        battleLog: battleResult.logs
      });

      await battleRecord.save();

      // Update player stats concurrently
      await Promise.all([
        Player.updateOne(
          { _id: battleResult.winner }, 
          { $inc: { 'battleStats.wins': 1 } }
        ),
        Player.updateOne(
          { _id: battleResult.loser }, 
          { $inc: { 'battleStats.losses': 1 } }
        )
      ]);

      res.status(201).json({
        success: true,
        data: battleRecord
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Battle failed: ' + error.message
      });
    }
  },

  // Get battle history
  getBattleHistory: async (req, res) => {
    try {
      const battles = await Battle.find({
        participants: req.player._id
      })
      .populate('participants winner', 'username')
      .sort({ createdAt: -1 });

      res.json({
        success: true,
        count: battles.length,
        data: battles
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch battle history'
      });
    }
  },

  // Leaderboard
  getLeaderboard: async (req, res) => {
    try {
      const leaders = await Player.aggregate([
        { $sort: { 'battleStats.wins': -1 } },
        { $limit: 10 },
        { $project: { 
          username: 1, 
          wins: '$battleStats.wins',
          losses: '$battleStats.losses',
          winRate: {
            $divide: [
              '$battleStats.wins',
              { $add: ['$battleStats.wins', '$battleStats.losses'] }
            ]
          }
        }}
      ]);

      res.json({
        success: true,
        data: leaders
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch leaderboard'
      });
    }
  }
}
// Proper controller structure
exports.startBattle = async (req, res) => {
  try {
    // Your battle start logic
    res.json({ message: 'Battle started successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.handleAttack = async (req, res) => {
  // Attack handling logic
};

exports.getBattleResults = async (req, res) => {
  // Results retrieval logic
};