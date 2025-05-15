const request = require('supertest');
const app = require('../../app');

describe('End-to-End User Flow', () => {
  it('should allow a player to register, join a faction, and mint an NFT', async () => {
    // Register player
    const playerResponse = await request(app)
      .post('/api/player/register')
      .send({ username: 'newplayer', walletAddress: 'player-wallet-address' });

    expect(playerResponse.status).toBe(200);
    const playerId = playerResponse.body.playerId;

    // Join faction
    const factionResponse = await request(app)
      .post('/api/faction/join')
      .send({ playerId, factionId: 'faction-id' });

    expect(factionResponse.status).toBe(200);

    // Mint NFT
    const nftResponse = await request(app)
      .post('/api/marketplace/list')
      .send({ playerId, nftId: 'nft-id', price: 0.1 });

    expect(nftResponse.status).toBe(200);
  });
});