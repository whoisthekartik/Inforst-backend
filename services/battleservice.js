const Player = require('../models/Player');

// Calculate battle outcome
exports.calculateBattle = async (attackerId, defenderId) => {
  const [attacker, defender] = await Promise.all([
    Player.findById(attackerId),
    Player.findById(defenderId)
  ]);

  const attackerPower = attacker.pokemon.level * Math.random();
  const defenderPower = defender.pokemon.level * Math.random();

  return {
    winner: attackerPower > defenderPower ? attackerId : defenderId,
    damage: Math.abs(attackerPower - defenderPower)
  };
};