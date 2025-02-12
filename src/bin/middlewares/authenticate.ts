import { JWT } from '@fastify/jwt';
import { FastifyRequest, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';

interface JWTPayload {
    id: string;
    email: string;
    iat?: number;
    exp?: number;
}

declare module '@fastify/jwt' {
    interface FastifyJWT {
        payload: JWTPayload;
        user: {
            id: string;
            email: string;
        }
    }
}

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
        jwt: JWT;
    }
}

export default fp(async (fastify) => {
    fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const authHeader = request.headers.authorization;
            if (!authHeader) {
                throw new Error('No token provided');
            }

            const token = authHeader.replace('Bearer ', '');
            const decoded = fastify.jwt.verify<JWTPayload>(token);

            // Set the authenticated user on the request
            request.user = {
                id: decoded.id,
                email: decoded.email
            };
        } catch (err) {
            reply.code(401).send({ message: 'Unauthorized' });
        }
    });
}, {
    name: 'authenticate',
    dependencies: ['@fastify/jwt']
});