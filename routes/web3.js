// routes/web3.js
const express = require('express');
const router = express.Router();
const { mintNFT } = require('../web3/nftService');

router.post('/mint', async (req, res) => {
  const { address, tokenURI } = req.body;

  try {
    const receipt = await mintNFT(address, tokenURI);
    res.status(200).json({ success: true, tx: receipt.transactionHash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Minting failed' });
  }
});

module.exports = router;