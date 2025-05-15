const express = require('express');
const router = express.Router();
const AnalyticsEvent = require('../models/AnalyticsEvent');

// Get recent events
router.get('/events', async (req, res) => {
  try {
    const events = await AnalyticsEvent.find().sort({ timestamp: -1 }).limit(100).lean();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching analytics' });
  }
});

module.exports = router;