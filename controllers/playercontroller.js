
const Player = require('../models/Player');
const NFT = require('../models/NFT');
const Battle = require('../models/Battle');

const playerController = {
  // Get player profile
  getPlayerProfile: async (req, res) => {
    try {
      const player = await Player.findById(req.params.id)
        .populate({
          path: 'nfts',
          select: 'metadataURI stats mintedAt'
        })
        .populate({
          path: 'battleStats.recentBattles',
          populate: {
            path: 'participants winner',
            select: 'username'
          }
        });

      if (!player) {
        return res.status(404).json({ error: 'Player not found' });
      }

      res.json(player);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update player profile
  updatePlayerProfile: async (req, res) => {
    try {
      const updates = Object.keys(req.body);
      const allowedUpdates = ['username', 'avatar', 'bio'];
      const isValidOperation = updates.every(update => 
        allowedUpdates.includes(update)
      );

      if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' });
      }

      const player = await Player.findByIdAndUpdate(
        req.player.id,
        req.body,
        { new: true, runValidators: true }
      );

      res.json(player);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get player inventory
  getPlayerInventory: async (req, res) => {
    try {
      const inventory = await NFT.find({ owner: req.player.id })
        .sort({ mintedAt: -1 })
        .populate('owner', 'username');

      res.json(inventory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete player account
  deletePlayerAccount: async (req, res) => {
    try {
      const player = await Player.findById(req.player.id);
      
      // Cleanup related data
      await Promise.all([
        NFT.deleteMany({ owner: player._id }),
        Battle.deleteMany({ participants: player._id }),
        player.remove()
      ]);

      res.json({ message: 'Account deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Search players
  searchPlayers: async (req, res) => {
    try {
      const { username } = req.query;
      const players = await Player.find({
        username: { $regex: username, $options: 'i' }
      }).limit(10);

      res.json(players);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = playerController;