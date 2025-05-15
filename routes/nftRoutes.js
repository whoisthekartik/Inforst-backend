const express = require('express');
const router = express.Router();
const nftService = require('../services/nftService');
const NFTModel = require('../models/NFT');

/**
 * @swagger
 * /api/nft/mint:
 *   post:
 *     summary: Mint a new NFT
 *     description: Mints an NFT and returns transaction hash.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 example: "0x123456..."
 *               tokenURI:
 *                 type: string
 *                 example: "https://example.com/metadata.json"
 *     responses:
 *       200:
 *         description: NFT minted successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/mint', async (req, res) => {
  try {
    const { to, tokenURI } = req.body;
    if (!to || !tokenURI) {
      return res.status(400).json({ error: 'Missing required fields: to, tokenURI' });
    }

    const txHash = await nftService.mintNFT(to, tokenURI);
    res.status(200).json({ success: true, txHash });
  } catch (err) {
    console.error('Minting Error:', err);
    res.status(500).json({ error: 'NFT minting failed' });
  }
});

/**
 * @swagger
 * /api/nft/list:
 *   get:
 *     summary: List all minted NFTs
 *     responses:
 *       200:
 *         description: A list of NFTs
 *       500:
 *         description: Failed to fetch NFTs
 */
router.get('/list', async (req, res) => {
  try {
    const nfts = await NFTModel.find().sort({ mintedAt: -1 });
    res.status(200).json(nfts);
  } catch (err) {
    console.error('Fetch Error:', err);
    res.status(500).json({ error: 'Failed to fetch NFTs' });
  }
const { mintNFT, listNFTs } = require("../controllers/nftController");
const auth = require("../middleware/authMiddleware");

router.post("/mint", auth, mintNFT); // protected
router.get("/list", listNFTs);       // public
});

module.exports = router;