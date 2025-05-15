// tests/integration/faction.test.js
const request = require('supertest');
const app = require('../../src/app'); // Import your Express app

describe('Faction Routes', () => {
  it('should create a faction successfully', async () => {
    const factionData = {
      name: 'Frostborn',
      members: ['60d0fe4f5311236168a109ca'] // Example player ID
    };

    const response = await request(app).post('/api/factions/create').send(factionData);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(factionData.name);
    expect(response.body.members.length).toBe(factionData.members.length);
  });

  it('should return an error for missing faction name', async () => {
    const factionData = {
      members: ['60d0fe4f5311236168a109ca']
    };

    const response = await request(app).post('/api/factions/create').send(factionData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Faction name is required');
  });
});