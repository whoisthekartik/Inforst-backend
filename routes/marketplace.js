const express = require('express');
const router = express.Router();
const marketplaceController = require('../controllers/marketplaceController');
const { verifyToken, verifyNFT } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

// List NFT for sale
router.post('/list',
  verifyToken,
  verifyNFT,
  validate(['nftId', 'price']),
  marketplaceController.listNFT
);

// Buy NFT
router.post('/:listingId/buy',
  verifyToken,
  marketplaceController.buyNFT
);

// Cancel listing
router.delete('/:listingId',
  verifyToken,
  marketplaceController.cancelListing
);

// Get active listings
router.get('/', marketplaceController.getListings);

// Get listing details
router.get('/:listingId', marketplaceController.getListing);

// Get user's listings
router.get('/user/:userId',
  verifyToken,
  marketplaceController.getUserListings

/**
 * @swagger
 * tags:
 *   name: Marketplace
 *   description: NFT Marketplace endpoints
 */

/**
 * @swagger
 * /api/marketplace/list:
 *   post:
 *     summary: List an NFT on the marketplace
 *     tags: [Marketplace]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - owner
 *               - tokenId
 *               - price
 *             properties:
 *               owner:
 *                 type: string
 *               tokenId:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: NFT listed successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/marketplace/buy:
 *   post:
 *     summary: Buy an NFT from the marketplace
 *     tags: [Marketplace]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - buyer
 *               - tokenId
 *             properties:
 *               buyer:
 *                 type: string
 *               tokenId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Purchase successful
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/marketplace/delist:
 *   post:
 *     summary: Delist an NFT from the marketplace
 *     tags: [Marketplace]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - owner
 *               - tokenId
 *             properties:
 *               owner:
 *                 type: string
 *               tokenId:
 *                 type: string
 *     responses:
 *       200:
 *         description: NFT delisted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
);

module.exports = router;