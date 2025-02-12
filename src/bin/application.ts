import 'dotenv/config';
import fastifyJwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { fastify, FastifyInstance } from 'fastify';

import { routes as alertRoutes } from '../alertManager/routes';
import { routes as authRoutes } from '../auth/routes';
import connectDB from './config/db';
import { swaggerConfig, swaggerUiConfig } from './config/swagger';
import authenticate from './middlewares/authenticate';
import { errorHandler } from './utils/errorHandler';


export const buildApp = async (): Promise<FastifyInstance> => {
  const app = fastify({
    logger: true,
  });

  await app.register(fastifySwagger, swaggerConfig(parseInt(process.env.PORT || '8000')));
  await app.register(fastifySwaggerUi, swaggerUiConfig);

  // Connect to MongoDB
  await connectDB();

  // Register plugins
  await app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'secret'
  });
  await app.register(authenticate);

  // Routes
  app.get('/health', async () => {
    return { health: 'OK!' };
  });

  await app.register(authRoutes, { prefix: '/auth' });
  await app.register(alertRoutes, { prefix: '/alerts' });

  // Register error handler
  app.setErrorHandler(errorHandler);

  return app;
};
