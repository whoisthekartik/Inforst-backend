const Faction = require("../models/Faction");

const updateFactionStats = async (factionId, updateData) => {
  const faction = await Faction.findById(factionId);
  if (!faction) throw new Error("Faction not found");

  Object.assign(faction, updateData);
  await faction.save();
  return faction;
};

const getFactionLeaderboard = async () => {
  return await Faction.find().sort({ points: -1 }).limit(10);
};

module.exports = {
  updateFactionStats,
  getFactionLeaderboard
};