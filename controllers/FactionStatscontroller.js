const FactionStats = require('../models/FactionStats');

exports.getAllFactionStats = async (req, res) => {
  try {
    const stats = await FactionStats.find({});
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch faction stats', error: err.message });
  }
};

exports.addFactionPoints = async (faction, points) => {
  try {
    const stats = await FactionStats.findOneAndUpdate(
      { faction },
      { $inc: { points } },
      { new: true, upsert: true }
    );
    return stats;
  } catch (err) {
    console.error('Error updating faction points:', err.message);
  }
};