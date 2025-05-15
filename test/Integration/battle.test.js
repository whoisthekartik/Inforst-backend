// tests/integration/battle.test.js
const battleService = require('../../src/services/battleService');

describe('Battle Service', () => {
  it('should handle battle and determine a winner', () => {
    const player = { name: 'Player1', health: 100 };
    const opponent = { name: 'Player2', health: 100 };

    const result = battleService.handleBattle(player, opponent);

    expect(result).toMatch(/wins/); // Expect either Player1 or Player2 wins
  });

  it('should update health after battle', () => {
    const player = { name: 'Player1', health: 100 };
    const opponent = { name: 'Player2', health: 100 };

    battleService.handleBattle(player, opponent);

    expect(player.health).toBeLessThan(100);
    expect(opponent.health).toBeLessThan(100);
  });
});