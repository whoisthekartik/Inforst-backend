const gainXP = (pokemon, amount) => {
  pokemon.xp = (pokemon.xp || 0) + amount;
  const xpToLevel = 50 * (pokemon.level || 1); // Simple formula
  if (pokemon.xp >= xpToLevel) {
    pokemon.level = (pokemon.level || 1) + 1;
    pokemon.xp = pokemon.xp - xpToLevel;
  }
  return pokemon;
};

const reduceHP = (pokemon, amount) => {
  pokemon.hp -= amount;
  if (pokemon.hp <= 0) {
    pokemon.hp = 0;
    // Handle fainted Pokémon (possibly switch out or remove from team)
  }
};