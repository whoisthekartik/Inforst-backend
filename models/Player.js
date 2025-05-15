const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  username: {
    type: String,
    unique: true,
    trim: true
  },
  faction: {
    type: String,
    enum: ['Frostborn', 'Infernos', ''],
    default: ''
  },
  nfts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NFT'
  }],
  battleStats: {
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 }
  }
}, { timestamps: true });

team: {
  type: [Object], // array of Pokémon objects
  default: []
}
faction: { type: String, enum: ['Infernos', 'Frostborn'], default: null },

module.exports = mongoose.model('Player', playerSchema);