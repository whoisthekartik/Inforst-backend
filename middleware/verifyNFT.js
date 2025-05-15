const nftService = require('../web3/nftService');

// Check if player owns the NFT
exports.verifyNFT = async (req, res, next) => {
  const { playerId, nftId } = req.body;
  const player = await Player.findById(playerId);

  if (!await nftService.checkOwnership(player.walletAddress, nftId)) {
    return res.status(403).json({ error: 'You do not own this NFT' });
  }
  next();
};