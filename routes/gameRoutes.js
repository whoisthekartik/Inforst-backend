const express = require('express');
const gainExperience = require('../services/gainExperience');

const router = express.Router();

router.post('/gain-experience', async (req, res) => {
  const { playerAddress, xpAmount } = req.body;
  
  if (!playerAddress || !xpAmount) {
    return res.status(400).json({ error: 'Missing player address or XP amount' });
  }

  try {
    const receipt = await gainExperience(playerAddress, xpAmount);
    res.json({ success: true, txHash: receipt.transactionHash });
  } catch (err) {
    res.status(500).json({ error: 'Transaction failed', details: err.message });
  }
});

module.exports = router;