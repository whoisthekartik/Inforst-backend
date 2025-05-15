const mongoose = require('mongoose');

const NFTSchema = new mongoose.Schema({
  tokenId: {
    type: Number,
    required: true,
    unique: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  metadataURI: {
    type: String,
    required: true
  },
  attributes: {
    attack: Number,
    defense: Number,
    rarity: {
      type: String,
      enum: ['common', 'uncommon', 'rare', 'legendary'],
      default: 'common'
    }
  },
  txHash: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('NFT', NFTSchema);