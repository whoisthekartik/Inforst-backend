// routes/nfts.js
const express = require('express');
const router = express.Router();
const {
  mintNFT,
  getPlayerNFTs,
  transferNFT,
  getNFTDetails
} = require('../controllers/nftcontroller'); // Match exact filename case

router.post('/mint', mintNFT);
router.get('/player', getPlayerNFTs);
router.post('/transfer', transferNFT);
router.get('/:tokenId', getNFTDetails);


GET /api/nft/player/:address

module.exports = router;