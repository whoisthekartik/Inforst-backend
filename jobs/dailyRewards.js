const cron = require('node-cron');
const Player = require('../models/Player');

// Give daily login rewards
cron.schedule('0 0 * * *', async () => {
  const players = await Player.find({ lastLogin: { $gte: new Date(Date.now() - 86400000) } });
  await Player.updateMany(
    { _id: { $in: players.map(p => p._id) } },
    { $inc: { tokens: 50 } }  // 50 tokens per day
  );
  console.log(Distributed daily rewards to ${players.length} players);
});