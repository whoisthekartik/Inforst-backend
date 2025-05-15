const request = require('supertest');
const app = require('../app');

describe('Marketplace Routes', () => {
  it('should allow a player to list an NFT for sale', async () => {
    const playerId = 'valid-player-id';
    const nftId = 'valid-nft-id';
    const price = 0.1; // Example price in ETH

    const response = await request(app)
      .post('/api/marketplace/list')
      .send({ playerId, nftId, price });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should return error if NFT is not owned by the player', async () => {
    const response = await request(app)
      .post('/api/marketplace/list')
      .send({ playerId: 'invalid-player-id', nftId: 'valid-nft-id', price: 0.1 });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Player does not own this NFT');
  });
});