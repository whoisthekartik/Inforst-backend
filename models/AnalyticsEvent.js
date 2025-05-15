const mongoose = require('mongoose');

const analyticsEventSchema = new mongoose.Schema({
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventType: { type: String, required: true },   // e.g., 'NFT_MINTED', 'BATTLE_WON'
  metadata: { type: Object },                    // optional extra details
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AnalyticsEvent', analyticsEventSchema);