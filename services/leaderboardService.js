
const User = require('../models/userModel');

async function getTopContributors(limit = 10) {
  return await User.find({ contributionScore: { $gt: 0 } })
    .sort({ contributionScore: -1 })
    .limit(limit)
    .select('username contributionScore faction');
}

module.exports = { getTopContributors };