
const mongoose = require('mongoose');

const BattleSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  }],
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  damageDealt: Number,
  battleLog: [String],
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Battle', BattleSchema);