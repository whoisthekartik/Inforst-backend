const mongoose = require('mongoose');

const factionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  faction: {
    type: String,
    enum: ['Frostborn', 'Infernos', 'Neutral'],
    default: 'Neutral'
  },
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Faction', factionSchema);