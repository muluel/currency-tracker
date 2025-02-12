import { SwaggerOptions } from '@fastify/swagger';
import { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

export const swaggerConfig = (port: number): SwaggerOptions => ({
    openapi: {
        info: {
            title: 'Crypto Alerts API',
            description: 'API documentation for the Crypto Alerts service',
            version: '1.0.0'
        },
        servers: [{
            url: `http://localhost:${port}`
        }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    }
});

export const swaggerUiConfig: FastifySwaggerUiOptions = {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    staticCSP: true,
};
