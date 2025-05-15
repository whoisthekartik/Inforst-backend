const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  logger.error(`${err.message} - ${req.method} ${req.originalUrl}`);
  res.status(500).json({ message: 'Internal Server Error' });
};