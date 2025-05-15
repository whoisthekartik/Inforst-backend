// tests/integration/nft.test.js
const request = require('supertest');
const app = require('../../src/app');

describe('NFT Routes', () => {
  it('should mint an NFT successfully', async () => {
    const nftData = {
      playerAddress: '0xPlayerAddress',
      tokenURI: 'http://example.com/token-uri'
    };

    const response = await request(app).post('/api/nfts/mint').send(nftData);

    expect(response.status).toBe(200);
    expect(response.body.receipt).toHaveProperty('transactionHash');
  });

  it('should return an error for missing tokenURI', async () => {
    const nftData = {
      playerAddress: '0xPlayerAddress'
    };

    const response = await request(app).post('/api/nfts/mint').send(nftData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Token URI is required');
  });
});