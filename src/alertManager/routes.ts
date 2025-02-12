import { FastifyInstance } from 'fastify';

import { get, list, create, patch, deleteAlert } from './controllers';
import { alertResponseSchema, errorResponseSchema, createAlertSchema } from './schemas';

export async function routes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', fastify.authenticate);

  fastify.get('/:id', {
    schema: {
      security: [{ bearerAuth: [] }],
      response: {
        200: alertResponseSchema,
        404: errorResponseSchema,
        500: errorResponseSchema,
      },
    },
  }, get);

  fastify.get('/', {
    schema: {
      security: [{ bearerAuth: [] }],
      response: {
        200: { type: 'array', items: alertResponseSchema },
        400: errorResponseSchema,
        500: errorResponseSchema
      },
    },
  }, list);

  fastify.post('/', {
    preValidation: [fastify.authenticate],
    schema: {
      security: [{ bearerAuth: [] }],
      body: createAlertSchema.body,
      response: {
        201: { type: 'object', properties: { _id: { type: 'string' }, }, },
        400: errorResponseSchema,
        500: errorResponseSchema
      },
    },
  }, create);

  fastify.patch('/:id', {
    schema: {
      security: [{ bearerAuth: [] }],
      body: {
        type: 'object',
        properties: {
          price: { type: 'number' },
          type: { type: 'string', enum: ['above', 'below'] },
          status: { type: 'string', enum: ['active', 'inactive'] },
        },
      },
      response: {
        200: alertResponseSchema,
        404: errorResponseSchema,
        500: errorResponseSchema
      },
    },
  }, patch);

  fastify.delete('/:id', {
    schema: {
      security: [{ bearerAuth: [] }],
      response: {
        200: errorResponseSchema,
        400: errorResponseSchema,
        404: errorResponseSchema,
        500: errorResponseSchema
      },
    },
  }, deleteAlert);

}