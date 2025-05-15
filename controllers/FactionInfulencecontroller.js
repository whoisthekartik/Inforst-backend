const FactionInfluence = require('../models/FactionInfluence');

exports.updateInfluence = async (req, res) => {
  const { faction, points } = req.body;

  if (!['Frostborn', 'Infernos'].includes(faction)) {
    return res.status(400).json({ error: 'Invalid faction' });
  }

  try {
    const record = await FactionInfluence.findOneAndUpdate(
      { faction },
      { $inc: { points }, $set: { lastUpdated: new Date() } },
      { new: true, upsert: true }
    );
    res.status(200).json(record);
  } catch (err) {
    console.error('Update Influence Error:', err);
    res.status(500).json({ error: 'Failed to update influence' });
  }
};

exports.getInfluence = async (req, res) => {
  try {
    const data = await FactionInfluence.find({});
    res.status(200).json(data);
  } catch (err) {
    console.error('Fetch Influence Error:', err);
    res.status(500).json({ error: 'Failed to fetch influence' });
  }
};