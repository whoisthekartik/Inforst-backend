const mongoose = require('mongoose');

const marketplaceSchema = new mongoose.Schema({
  nftId: { type: String, required: true },
  seller: { type: String, required: true },
  buyer: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MarketplaceTransaction', marketplaceSchema);