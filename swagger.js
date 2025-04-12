const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Processo Seletivo Green Acesso',
      version: '1.0.0',
      description: 'Documentação da API Processo Seletivo Green Acesso',
    },
    servers: [
      {
        url: 'http://localhost:5000', 
        description: 'Servidor Local',
      },
      
    ],
  },

  apis: ['./routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const swaggerSetup = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = swaggerSetup;