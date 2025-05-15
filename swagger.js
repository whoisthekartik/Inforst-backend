
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerSpec');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Inforst API',
      version: '1.0.0',
      description: 'API documentation for Inforst game'
    },
    servers: [
      {
        url: 'http://localhost:5000'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js']
};

function swaggerDocs(app) {
  if (!swaggerUi || !swaggerUi.setup) {
    console.error('swagger-ui-express failed to import properly');
    return;
  }

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger docs available at http://localhost:5000/api-docs');
}

module.exports = swaggerDocs;