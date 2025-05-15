const mongoose = require('mongoose');

const factionSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['Frostborn', 'Infernos'],
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Faction || mongoose.model('Faction', factionSchema);