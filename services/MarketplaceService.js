const MarketplaceTransaction = require('../models/marketplaceModel');

async function recordTransaction(nftId, seller, buyer, price) {
  const tx = new MarketplaceTransaction({ nftId, seller, buyer, price });
  await tx.save();
  return tx;
}

async function getTransactionHistory(nftId) {
  return await MarketplaceTransaction.find({ nftId }).sort({ date: -1 });
}

module.exports = {
  recordTransaction,
  getTransactionHistory
};