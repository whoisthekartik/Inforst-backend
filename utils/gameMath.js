
class GameMath {
  /**
   * Calculate experience points gained based on levels
   * @param {number} winnerLevel 
   * @param {number} loserLevel 
   * @returns {number}
   */
  static calculateXP(winnerLevel, loserLevel) {
    const levelDifference = winnerLevel - loserLevel;
    return Math.max(50 + (levelDifference * 10), 10);
  }

  /**
   * Calculate player level based on total XP
   * @param {number} xp 
   * @returns {number}
   */
  static calculateLevel(xp) {
    return Math.floor(Math.sqrt(xp / 100));
  }

  /**
   * Calculate battle reward multiplier
   * @param {number} participants 
   * @returns {number}
   */
  static calculateBattleRewardMultiplier(participants) {
    return participants === 2 ? 1.5 : 1;
  }

  /**
   * Generate random loot based on rarity
   * @param {number} rarityTier 
   * @returns {string}
   */
  static randomLootDrop(rarityTier) {
    const chances = {
      common: 0.6,
      uncommon: 0.3,
      rare: 0.08,
      legendary: 0.02
    };
    
    const roll = Math.random();
    let cumulative = 0;
    
    for (const [tier, chance] of Object.entries(chances)) {
      cumulative += chance;
      if (roll <= cumulative) return tier;
    }
    
    return 'common';
  }
}

module.exports = GameMath;