// models/PlayerModel.js
const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  playerId: String,
  data: {
    position: { x: Number, y: Number },
    inventory: [String],
    quests: [String],
    lastMap: String
  }
});
// In your Player model
const playerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  hp: { type: Number, default: 100 },
  inventory: { type: [String], default: [] },
  location: { type: Object, default: { x: 0, y: 0 } }, // Add location field
  // More fields as needed...
});

const Player = mongoose.model('Player', playerSchema);
module.exports = mongoose.model('Player', PlayerSchema);