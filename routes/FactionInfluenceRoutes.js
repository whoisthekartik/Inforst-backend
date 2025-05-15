// routes/factionInfluenceRoutes.js

const express = require('express');
const router = express.Router();

// Example route
router.get('/', (req, res) => {
  res.json({ message: 'Faction influence route is working!' });
});

module.exports = router;