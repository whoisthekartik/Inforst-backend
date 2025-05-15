// src/services/redisService.js
const redisClient = require('../config/redis');

// Set value in Redis
const setCache = (key, value, expiration = 3600) => {
  redisClient.setex(key, expiration, JSON.stringify(value), (err, reply) => {
    if (err) {
      console.error('Error setting value in Redis', err);
    } else {
      console.log(Cached value for ${key}: ${reply});
    }
  });
};

// Get value from Redis
const getCache = (key, callback) => {
  redisClient.get(key, (err, data) => {
    if (err) {
      console.error('Error getting value from Redis', err);
      callback(err, null);
    } else if (data) {
      console.log(Cache hit for ${key});
      callback(null, JSON.parse(data));
    } else {
      console.log(Cache miss for ${key});
      callback(null, null);
    }
  });
};

module.exports = { setCache, getCache };