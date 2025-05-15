const AnalyticsEvent = require('../models/AnalyticsEvent');

exports.trackEvent = async (playerId, eventType, metadata = {}) => {
  try {
    const event = new AnalyticsEvent({ playerId, eventType, metadata });
    await event.save();
    console.log([Analytics] Event tracked: ${eventType});
  } catch (err) {
    console.error('Error tracking analytics event:', err);
  }
};