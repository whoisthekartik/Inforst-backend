const jwt = require('jsonwebtoken');
const NFT = require('../models/NFT');
const Player = require('../models/Player');

const authMiddleware = {
  // JWT Authentication Middleware
  authenticate: async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ 
          success: false,
          error: 'Authorization token required' 
        });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const player = await Player.findById(decoded.playerId)
        .select('-__v -createdAt -updatedAt')
        .lean();

      if (!player || player.status !== 'active') {
        return res.status(401).json({
          success: false,
          error: 'Account not found or suspended'
        });
      }

      req.player = player;
      next();
    } catch (err) {
      const errorMessage = err.name === 'TokenExpiredError' 
        ? 'Session expired. Please log in again'
        : 'Invalid authentication token';

      res.status(401).json({
        success: false,
        error: errorMessage,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
      });
    }
  },

  // NFT Ownership Check Middleware
  checkNFTOwnership: (paramName = 'nftId') => {
    return async (req, res, next) => {
      try {
        if (!req.player) throw new Error('Authentication required');

        const nft = await NFT.findById(req.params[paramName])
          .select('owner')
          .lean();

        if (!nft) return res.status(404).json({ 
          success: false, 
          error: 'NFT not found' 
        });

        if (nft.owner.toString() !== req.player._id.toString()) {
          return res.status(403).json({ 
            success: false,
            error: 'NFT ownership verification failed'
          });
        }

        req.nft = nft;
        next();
      } catch (err) {
        res.status(500).json({
          success: false,
          error: 'Ownership check failed',
          ...(process.env.NODE_ENV === 'development' && { details: err.message })
        });
      }
    };
  },

  // Battle Readiness Check Middleware
  checkBattleReady: async (req, res, next) => {
    try {
      const player = await Player.findById(req.player._id)
        .select('nfts')
        .populate('nfts', 'status')
        .lean();

      const hasActiveNFTs = player.nfts.some(nft => nft.status === 'active');

      if (!hasActiveNFTs) {
        return res.status(403).json({
          success: false,
          error: 'No active NFTs available for battle'
        });
      }

      next();
    } catch (err) {
      res.status(500).json({
        success: false,
        error: 'Battle readiness check failed',
        ...(process.env.NODE_ENV === 'development' && { details: err.message })
      });
    }
  }
};

module.exports = {
  authenticate: (req, res, next) => { /* ... */ },
  checkBattleReady: async (req, res, next) => { /* ... */ }
};