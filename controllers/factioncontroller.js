const Faction = require('../models/factionModel');

const createFaction = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    const newFaction = new Faction({ name, description });
    await newFaction.save();

    res.status(201).json(newFaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create faction' });
  }
};

// At the top of factionController.js
const getFaction = async (req, res) => {
  try {
    const { playerId } = req.params;

    // Your logic to get faction by playerId from DB goes here

    res.status(200).json({ success: true, faction: 'Example Faction' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const joinFaction = async (req, res) => {
  try {
    const { playerId, factionName } = req.body;
    // Your logic here...
    res.status(200).json({ success: true, message: `Joined ${factionName}` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const leaveFaction = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (!user.faction) {
      return res.status(400).json({ success: false, message: "You are not in a faction" });
    }

    user.faction = null;
    await user.save();

    res.status(200).json({ success: true, message: "You have left your faction" });
  } catch (error) {
    console.error("Error leaving faction:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createFaction,
  joinFaction,
  getFaction,
leaveFaction,
};