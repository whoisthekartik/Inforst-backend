// swaggerDocs.js

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerSpec'); // this file holds your Swagger definition

function swaggerDocs(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger docs available at http://localhost:5000/api-docs');
}

module.exports = swaggerDocs;