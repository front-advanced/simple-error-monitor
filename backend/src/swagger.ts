import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Error Monitoring API',
      version: '1.0.0',
      description: 'API for error monitoring platform',
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        ErrorEvent: {
          type: 'object',
          required: ['message', 'stack', 'timestamp', 'url', 'userAgent', 'projectId', 'environment', 'severity'],
          properties: {
            message: { type: 'string' },
            stack: { type: 'string' },
            timestamp: { type: 'string', format: 'date-time' },
            url: { type: 'string' },
            userAgent: { type: 'string' },
            projectId: { type: 'string' },
            environment: { type: 'string', enum: ['production', 'development', 'staging'] },
            severity: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] },
            metadata: {
              type: 'object',
              additionalProperties: true
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'],
};

export const specs = swaggerJsdoc(options);