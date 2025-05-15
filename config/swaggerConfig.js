const swaggerJsdoc = require("swagger-jsdoc");
const path = require('path');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Inforst API",
      version: "1.0.0",
      description: "API documentation for Inforst",
    },
    // There may be 'paths' or 'components' here
  },
  
apis: [path.join(__dirname, '../routes/factionRoutes.js')], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;