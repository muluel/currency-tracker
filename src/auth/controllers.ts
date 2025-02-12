import { FastifyReply, FastifyRequest } from "fastify";

import userService from "./services";
import logger from "../bin/utils/logger";

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, password } = request.body as { email: string; password: string };
    const user = await userService.register(email, password);
    const now = Math.floor(Date.now() / 1000)
    const token = request.server.jwt.sign({ id: user.id, email: user.email, iat: now, exp: now + 900 }); // expiration in 15 minutes 
    reply.status(201).send({ token });
  } catch (error: any) {
    logger.error(error)
    reply.status(400).send({ message: error.message });
  }
}

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, password } = request.body as { email: string; password: string };
    const user = await userService.login(email, password);
    const now = Math.floor(Date.now() / 1000)
    const token = request.server.jwt.sign({ id: user.id, email: user.email, iat: now, exp: now + 900 }); // expiration in 15 minutes 
    reply.send({ token });
  } catch (error: any) {
    logger.error(error)
    reply.status(401).send({ message: error.message });
  }
}

export const logout = async (_request: FastifyRequest, reply: FastifyReply) => {
  reply.send({ message: 'Logged out successfully' });
}