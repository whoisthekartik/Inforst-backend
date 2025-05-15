// src/middleware/cacheMiddleware.js
const redisService = require('../services/redisService');

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl; // Use the URL as the cache key
  redisService.getCache(key, (err, cachedData) => {
    if (err) {
      return next();
    }

    if (cachedData) {
      console.log(Returning cached data for ${key});
      return res.json(cachedData);
    }

    console.log(Cache miss for ${key});
    next();
  });
};

module.exports = cacheMiddleware;