import { FastifyReply, FastifyRequest } from 'fastify';
import logger from './logger';

export const errorHandler = (error: any, _request: FastifyRequest, reply: FastifyReply) => {
  logger.error(error);
  reply.status(error.statusCode || 500).send({ message: error.message || 'Internal server error' });
};