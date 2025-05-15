const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inforst Game API',
      version: '1.0.0',
      description: 'API documentation for Inforst game NFT functionality'
    },
  },
  apis: ['./routes/*.js'], // Path to your route files
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };