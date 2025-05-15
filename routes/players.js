const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');
const { authenticate } = require('../middleware/auth'); // Destructure specific middleware
const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const maps = require('../game_data/maps.json');
router.post('/set-faction', async (req, res) => {
  const { userId, faction } = req.body;

  const player = await Player.findOne({ userId });
  if (!player) return res.status(404).json({ error: 'Player not found' });

  player.faction = faction;
  await player.save();

  res.json({ success: true, faction });
});
// backend/routes/player.js
router.post('/update-location', async (req, res) => {
  const { userId, newLocation } = req.body;
router.post('/check-event', async (req, res) => {
  const { userId } = req.body;
  const player = await Player.findOne({ userId });
  if (!player) return res.status(404).json({ error: 'Player not found' });

  const { x, y } = player.position;

  // Example map event check (adjust logic to your map data)
  if (x === 5 && y === 3) {
    // Simulate wild Pokémon encounter
    const wildPokemons = [
      { name: 'Pidgey', level: 2, hp: 40 },
      { name: 'Rattata', level: 3, hp: 45 },
      { name: 'Zubat', level: 4, hp: 50 }
    ];
    const enemy = wildPokemons[Math.floor(Math.random() * wildPokemons.length)];

    return res.json({ triggered: true, type: 'wild', enemy });
  }

  res.json({ triggered: false });
});
  
  const player = await Player.findOne({ userId });
  if (!player) return res.status(404).json({ error: 'Player not found' });
  
  // Update the player's location
  player.position = newLocation;
  await player.save();

  res.json({ newLocation: player.position });
});
// In your backend, e.g., player.js
router.post('/update-location', async (req, res) => {
  const { userId, newLocation } = req.body;

  const player = await Player.findOne({ userId });
  if (!player) return res.status(404).json({ error: 'Player not found' });

  // Update player's location
  player.location = newLocation;

  await player.save();
  res.json({ location: player.location });
});
router.post('/heal', async (req, res) => {
  const { userId = "test-user" } = req.body;
const createPokemon = (name) => ({
  name,
  level: 1,
  hp: 100, // Starting HP
  xp: 0,
  // You can expand with attack, defense, moves, etc.
});
if (event.type === 'dialogue') {
  return res.json({ triggered: true, type: 'dialogue', text: event.text });
}

if (event.type === 'shop') {
  return res.json({ triggered: true, type: 'shop' });
}

if (event.type === 'battle') {
  // Example enemy, you can randomize this later
  const enemy = {
    name: "Wild Pyronox",
    level: 5,
    hp: 120
  };
  return res.json({ triggered: true, type: 'battle', enemy });
}
const { createPokemon } = require('../utils/pokemonUtils');
const maps = require('../game_data/maps.json');
const mapEvents = require('../game_data/map_events.json');

router.post('/check-event', async (req, res) => {
  const { userId = "test-user" } = req.body;

  const player = await Player.findOne({ userId });
  if (!player) return res.status(404).json({ error: "Player not found" });

  const map = maps.find(m => m.id === player.currentMap);
  if (!map) return res.status(404).json({ error: "Map not found" });

  const eventsForMap = mapEvents.find(e => e.mapId === map.id)?.events || [];

  const event = eventsForMap.find(
    e => e.x === player.position.x && e.y === player.position.y
  );

  if (!event) return res.json({ triggered: false });

  if (event.type === 'dialogue') {
    return res.json({ triggered: true, type: 'dialogue', text: event.text });
  }

  if (event.type === 'shop') {
    return res.json({ triggered: true, type: 'shop' });
  }

  if (event.type === 'battle') {
    return res.json({ triggered: true, type: 'battle', enemy: event.enemy });
  }

  res.json({ triggered: true, type: event.type });
});

router.post('/create-or-load', async (req, res) => {
  const { userId = "test-user" } = req.body;

  let player = await Player.findOne({ userId });

  if (!player) {
    player = new Player({
      userId,
      currentMap: 'start-town',
      position: { x: 1, y: 1 },
      pokemons: [createPokemon("Pikachu")], // Starter Pokémon
    });

    await player.save();
  }

  res.json({ player });
});
module.exports = {
  createPokemon,
};

  const player = await Player.findOne({ userId });
  if (!player) return res.status(404).json({ error: "Player not found" });

  // Heal all Pokémon to full HP
  player.team = player.team.map(p => ({ ...p, hp: 100 }));

  await player.save();
  res.json({ message: "Your team has been healed!" });
});

router.post('/team', async (req, res) => {
  const { userId = "test-user" } = req.body;

  const player = await Player.findOne({ userId });
  if (!player) return res.status(404).json({ error: "Player not found" });

  res.json({ team: player.team || [] });
});

router.post('/catch', async (req, res) => {
  const { userId = "test-user", pokemon } = req.body;

  const player = await Player.findOne({ userId });
  if (!player) return res.status(404).json({ error: "Player not found" });

  // Add Pokémon to the team
  player.team.push(pokemon);
  await player.save();

  res.json({ success: true, team: player.team });
});


if (event.type === 'battle') {
  return res.json({
    triggered: true,
    type: 'battle',
    enemy: event.enemy
  });
}

router.post('/check-event', async (req, res) => {
  const { userId = "test-user" } = req.body;

  const player = await Player.findOne({ userId });
  if (!player) return res.status(404).json({ error: "Player not found" });

  const map = maps.find(m => m.id === player.currentMap);
  if (!map) return res.status(404).json({ error: "Map not found" });

  const event = map.events?.find(e => e.x === player.position.x && e.y === player.position.y);

  if (!event) return res.json({ triggered: false });

  // Custom handling per event type
  if (event.type === 'dialogue') {
    return res.json({ triggered: true, type: 'dialogue', text: event.text });
  }

  if (event.type === 'shop') {
    return res.json({ triggered: true, type: 'shop' });
  }

  // Add more types later: battle, healing, etc.

  res.json({ triggered: true, type: event.type });
});
router.post('/move', async (req, res) => {
  const { userId = "test-user", direction } = req.body;

  const player = await Player.findOne({ userId });
  if (!player) return res.status(404).json({ error: "Player not found" });

  let { x, y } = player.position;

  switch (direction) {
    case 'up': y -= 1; break;
    case 'down': y += 1; break;
    case 'left': x -= 1; break;
    case 'right': x += 1; break;
    default: return res.status(400).json({ error: "Invalid direction" });
  }

  // Optional: Add map boundaries or collisions here

  player.position = { x, y };
  await player.save();

  res.json({ message: "Moved", player });
});

router.post('/start', async (req, res) => {
  const userId = req.body.userId || "test-user"; // In production, use auth

  let player = await Player.findOne({ userId });
  if (!player) {
    player = new Player({
      userId,
      currentMap: "Map001",
      position: { x: 5, y: 5 },
      inventory: [],
      flags: {},
    });
    await player.save();
  }

  res.json({
    message: "Game started",
    player
  });
});

module.exports = router;

// Apply authentication middleware to all player routes
router.use(authenticate);

// Define player routes
router.get('/:id', playerController.getPlayerProfile);
router.get('/search', playerController.searchPlayers);
router.get('/inventory/me', playerController.getPlayerInventory);
router.patch('/me', playerController.updatePlayerProfile);
router.delete('/me', playerController.deletePlayerAccount);
router.post('/save', async (req, res) => {
  const { playerId, position, inventory, quests, lastMap } = req.body;
  try {
    await PlayerModel.findOneAndUpdate(
      { _id: playerId },
      { position, inventory, quests, lastMap },
      { upsert: true, new: true }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save player data.' });
  }
});

module.exports = router;