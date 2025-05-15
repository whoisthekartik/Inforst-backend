const mongoose = require('mongoose');

const FactionStatsSchema = new mongoose.Schema({
  faction: {
    type: String,
    enum: ['Frostborn', 'Infernos'],
    required: true,
    unique: true,
  },
  points: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('FactionStats', FactionStatsSchema);