import { FastifyInstance } from 'fastify';

import { login, logout, register } from './controllers';
import { emailPasswordSchema, errorResponseSchema, registerResponseSchema } from './schemas';

export async function routes(fastify: FastifyInstance) {
  fastify.post('/register', {
    schema: {
      body: emailPasswordSchema,
      response: {
        201: registerResponseSchema,
        400: errorResponseSchema,
        500: errorResponseSchema,
      }
    }
  }, register);

  fastify.post('/login', {
    schema: {
      body: emailPasswordSchema,
      response: {
        200: registerResponseSchema,
        401: errorResponseSchema,
      }
    }
  }, login);

  fastify.post('/logout', {
    preValidation: [fastify.authenticate],
    schema: {
      security: [{ bearerAuth: [] }],
      response: {
        200: errorResponseSchema,
        401: errorResponseSchema
      }
    }
  }, logout);
}