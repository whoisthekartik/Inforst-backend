const Player = require('../models/Player');

describe('Player Model', () => {
  it('should create a new player', async () => {
    const playerData = {
      username: 'testplayer',
      walletAddress: 'player-wallet-address',
    };

    const player = new Player(playerData);
    await player.save();

    expect(player.username).toBe('testplayer');
    expect(player.walletAddress).toBe('player-wallet-address');
  });

  it('should not create a player without a username', async () => {
    const playerData = {
      walletAddress: 'player-wallet-address',
    };

    try {
      await new Player(playerData).save();
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});