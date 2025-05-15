const jwt = require('jsonwebtoken');
const Player = require('../models/Player');

// Register new user
const register = async (req, res) => {
  try {
    const { walletAddress, username } = req.body;

    if (!walletAddress || !username) {
      return res.status(400).json({ message: 'walletAddress and username are required' });
    }

    let user = await Player.findOne({ walletAddress });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = await Player.create({ walletAddress, username });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: 'Registered successfully' });
  } catch (error) {
    console.error('Register Error:', error);
    return res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// Wallet login
const walletLogin = async (req, res) => {
  try {
    const { walletAddress, signature } = req.body;

    if (!walletAddress || !signature) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const player = await Player.findOneAndUpdate(
      { walletAddress: walletAddress.toLowerCase() },
      {
        $setOnInsert: {
          walletAddress: walletAddress.toLowerCase(),
          username: 'Player_' + Math.random().toString(36).substr(2, 5)
        }
      },
      { new: true, upsert: true }
    );

    const token = jwt.sign(
      { playerId: player._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, player });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
// Get profile
const getProfile = async (req, res) => {
  try {
    const player = await Player.findById(req.player.playerId).select('-__v -createdAt');

    if (!player) return res.status(404).json({ error: 'Player not found' });

    return res.json(player);
  } catch (error) {
    console.error('Profile error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Export all
module.exports = {
  register,
  walletLogin,
  getProfile
};