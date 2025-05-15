// test/factionRoutes.test.js
const request = require('supertest');
const app = require('../app'); // Your Express app

describe('Faction Routes', () => {
  it('should allow a player to join a faction', async () => {
    const playerId = 'valid-player-id'; // Replace with valid test data
    const factionId = 'valid-faction-id'; // Replace with valid faction

    const response = await request(app)
      .post('/api/faction/join')
      .send({ playerId, factionId });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should return error if player or faction not found', async () => {
    const response = await request(app)
      .post('/api/faction/join')
      .send({ playerId: 'invalid-player-id', factionId: 'invalid-faction-id' });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Player or Faction not found');
  });
});