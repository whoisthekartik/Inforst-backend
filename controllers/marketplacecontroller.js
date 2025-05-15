const Listing = require('../models/Listing');
const Web3 = require('web3');
const nftContract = require('../web3/nftContract');

// 1. List NFT
const listNFT = async (req, res) => {
  try {
    const { tokenId, price } = req.body;
    const sellerId = req.user.id;

    const newListing = new Listing({
      tokenId,
      price,
      seller: sellerId,
    });

    await newListing.save();

    console.log(`Listed NFT ${tokenId} at price ${price}`);
    res.status(201).json({
      success: true,
      message: 'NFT listed successfully',
      listing: newListing,
    });
  } catch (error) {
    console.error('List NFT Error:', error);
    res.status(500).json({ success: false, error: 'Failed to list NFT' });
  }
};

// 2. Buy NFT
const buyNFT = async (req, res) => {
  try {
    const { tokenId } = req.body;
    const buyerId = req.user.id;

    const listing = await Listing.findOne({ tokenId, isSold: false });

    if (!listing) {
      return res.status(404).json({ success: false, message: 'NFT not found or already sold' });
    }

    listing.isSold = true;
    await listing.save();

    console.log(`NFT ${tokenId} bought by user ${buyerId}`);
    res.status(200).json({ success: true, message: 'NFT bought successfully', listing });
  } catch (error) {
    console.error('Buy NFT Error:', error);
    res.status(500).json({ success: false, error: 'Failed to buy NFT' });
  }
};

// 3. Delist NFT
const delistNFT = async (req, res) => {
  try {
    const { tokenId } = req.body;
    const userId = req.user.id;

    const listing = await Listing.findOneAndDelete({ tokenId, seller: userId, isSold: false });

    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found or already sold' });
    }

    console.log(`Delisted NFT ${tokenId}`);
    res.status(200).json({ success: true, message: 'NFT delisted successfully' });
  } catch (error) {
    console.error('Delist NFT Error:', error);
    res.status(500).json({ success: false, error: 'Failed to delist NFT' });
  }
};

// 4. Handle Transaction (Optional - extend with Transaction model)
const handleTransaction = async (req, res) => {
  try {
    const { from, to, tokenId, price } = req.body;

    console.log(`Transaction: ${from} -> ${to}, tokenId: ${tokenId}, price: ${price}`);
    res.status(200).json({ success: true, message: 'Transaction recorded' });
  } catch (error) {
    console.error('Transaction Error:', error);
    res.status(500).json({ success: false, error: 'Failed to handle transaction' });
  }
};

// 5. Fetch History (Mock response for now)
const fetchHistory = async (req, res) => {
  try {
    const { nftId } = req.params;

    console.log(`Fetching history for NFT ${nftId}`);
    res.status(200).json({
      success: true,
      history: [
        {
          from: '0x123',
          to: '0xabc',
          tokenId: nftId,
          price: '0.1 ETH',
          date: '2025-04-07',
        },
      ],
    });
  } catch (error) {
    console.error('Fetch History Error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch history' });
  }
};

module.exports = {
  listNFT,
  buyNFT,
  delistNFT,
  handleTransaction,
  fetchHistory,
};