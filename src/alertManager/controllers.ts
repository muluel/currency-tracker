import { FastifyReply, FastifyRequest } from 'fastify';

import { alertService } from './services';
import logger from '../bin/utils/logger';

export const get = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  try {
    const alert = await alertService.get(id, request.user.id);
    logger.info(alert)
    if (!alert) {
      return reply.status(404).send({ message: 'Alert not found' });
    }
    reply.send(alert);
  } catch (error) {
    logger.error('Error getting alert:', error);
    reply.status(404).send({ message: 'Alert not found' });
  }
};

export const list = async (request: FastifyRequest, reply: FastifyReply) => {
  const alerts = await alertService.list(request.user.id);
  reply.send(alerts);
};

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const { symbol, price, type } = request.body as { symbol: string, price: number, type: 'above' | 'below' };
  const alert = await alertService.create(request.user.id, symbol, price, type);
  reply.status(201).send({ _id: alert.id });
};

export const patch = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const { price, type, status } = request.body as { price?: number, type?: 'above' | 'below', status?: 'active' | 'inactive' };
  const alert = await alertService.update(id, request.user.id, price, type, status);
  if (!alert) {
    return reply.status(404).send({ message: 'Alert not found' });
  }
  reply.send(alert);
};

export const deleteAlert = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const alert = await alertService.delete(id, request.user.id);
  if (!alert) {
    return reply.status(404).send({ message: 'Alert not found' });
  }
  reply.send({ message: 'Alert deleted successfully' });
};