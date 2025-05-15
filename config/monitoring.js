// src/config/monitoring.js
const Sentry = require('@sentry/node');

Sentry.init({ dsn: process.env.SENTRY_DSN });

const captureException = (error) => {
  Sentry.captureException(error);
};

module.exports = { captureException };