const mongoose = require('mongoose');

const marketItemSchema = new mongoose.Schema({
  nftId: { type: mongoose.Schema.Types.ObjectId, ref: 'NFT', required: true },
  price: { type: Number, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  sold: { type: Boolean, default: false },
  listedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MarketItem', marketItemSchema);