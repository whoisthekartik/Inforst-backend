
const marketplaceController = require('../controllers/marketplaceController');
const authenticate = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();
const {
  listNFT,
  buyNFT,
  delistNFT,
  handleTransaction,
  fetchHistory
} = require('../controllers/marketplaceController');

const auth = require('../middleware/authMiddleware'); // <-- move this UP before usage

/**
 * @swagger
 * /marketplace/list:
 *   post:
 *     summary: List an NFT for sale
 *     tags: [Marketplace]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: NFT listed
 */
router.post('/list', auth.authenticate, listNFT);
router.post('/buy', auth.authenticate, buyNFT);
router.post('/delist', auth.authenticate, delistNFT);
router.post('/transaction', handleTransaction);
router.get('/history/:nftId', fetchHistory);

module.exports = router;