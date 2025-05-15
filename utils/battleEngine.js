const gameMath = require('./gameMath');
const logger = require('./logger');

class BattleEngine {
  static calculateDamage(attacker, defender) {
    const baseDamage = attacker.stats.attack * (1 - defender.stats.defense / 100);
    const criticalChance = 0.1 + (attacker.stats.luck / 100);
    const isCritical = Math.random() < criticalChance;
    
    return {
      damage: isCritical ? baseDamage * 2 : baseDamage,
      isCritical
    };
  }

  static async simulatePvP(player1, player2) {
    const battleLog = [];
    let round = 1;

    // Clone players to preserve original data
    const p1 = { ...player1, health: player1.stats.health };
    const p2 = { ...player2, health: player2.stats.health };

    while (p1.health > 0 && p2.health > 0 && round <= 20) {
      const p1Attack = this.calculateDamage(p1, p2);
      p2.health -= p1Attack.damage;
      
      // Fixed template literal with backticks
      battleLog.push(`Round ${round}: ${p1.name} hits ${p2.name} for ${p1Attack.damage.toFixed(1)} damage`);

      if (p2.health <= 0) break;

      const p2Attack = this.calculateDamage(p2, p1);
      p1.health -= p2Attack.damage;
      
      // Fixed this line with backticks
      battleLog.push(`Round ${round}: ${p2.name} hits ${p1.name} for ${p2Attack.damage.toFixed(1)} damage`);

      round++;
    }

    return {
      winner: p1.health > p2.health ? p1 : p2,
      loser: p1.health <= p2.health ? p1 : p2,
      battleLog,
      rounds: round - 1,
      damageDealt: Math.abs(p1.health - p2.health)
    };
  }

  // Rest of the class remains the same...
}

module.exports = BattleEngine;