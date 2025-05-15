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
const axios = require('axios');

const BASE_URL = process.env.BACKEND_URL || 'http://localhost:3000'; // Adjust as needed

async function addInfluencePoints(faction, points) {
  try {
    const res = await axios.post(${BASE_URL}/api/faction-influence/update, {
      faction,
      points
    });
    return res.data;
  } catch (error) {
    console.error('Error updating faction influence:', error.response?.data || error.message);
    return null;
  }
}

module.exports = { addInfluencePoints };
module.exports = {
  updateFactionStats,
  getFactionLeaderboard
};