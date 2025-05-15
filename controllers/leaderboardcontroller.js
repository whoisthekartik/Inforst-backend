const User = require('../models/userModel');


const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find().sort({ contributionScore: -1 }).limit(10);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching leaderboard', error: err });
  }
};


async function getTopContributors(limit = 10) {
  return await User.find({ contributionScore: { $gt: 0 } })
    .sort({ contributionScore: -1 })
    .limit(limit)
    .select('username contributionScore faction');
}

module.exports = { getTopContributors };

module.exports = { getLeaderboard };