const mongoose = require('mongoose');

const factionInfluenceSchema = new mongoose.Schema({
  faction: {
    type: String,
    enum: ['Frostborn', 'Infernos'],
    required: true,
    unique: true
  },
  points: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FactionInfluence', factionInfluenceSchema);