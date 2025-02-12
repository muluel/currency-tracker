import { FastifyInstance } from 'fastify';
import { buildApp } from '../src/bin/application';
import { describe, it, beforeAll, afterAll, expect } from '@jest/globals';
import User from '../src/auth/models';

let app: FastifyInstance;
let token: string;
beforeAll(async () => {
  app = await buildApp();
  await app.listen({ port: 3000 });
});

afterAll(async () => {
  await app.close();
});

describe('Alert Controller', () => {
  let alertId: string;

  beforeAll(async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: {
        email: 'test@example.com',
        password: 'testpassword123'
      }
    });

    token = response.json().token;
  })

  afterAll(async () => {
    await User.findOneAndDelete({ email: "test@example.com" })
  })


  it('should create an alert', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/alerts',
      payload: {
        symbol: 'BTC',
        price: 50000,
        type: 'above'
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toHaveProperty('_id');
    alertId = response.json()._id;
  });

  it('should fetch an alert by ID', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/alerts/${alertId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toHaveProperty('_id', alertId);
  });

  it('should fetch all alerts', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/alerts',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBe(true);
  });

  it('should update an alert', async () => {
    const response = await app.inject({
      method: 'PATCH',
      url: `/alerts/${alertId}`,
      payload: {
        price: 60000,
        type: 'below',
        status: 'active'
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toHaveProperty('_id', alertId);
    expect(response.json()).toHaveProperty('price', 60000);
    expect(response.json()).toHaveProperty('type', 'below');
    expect(response.json()).toHaveProperty('status', 'active');
  });

  it('should delete an alert', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/alerts/${alertId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toHaveProperty('message', 'Alert deleted successfully');
  });

  it('should return 404 for a non-existent alert', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/alerts/non-existent-id`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toHaveProperty('message', 'Alert not found');
  });

  it('should return 401 if no authorization token is provided', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/alerts'
    });

    expect(response.statusCode).toBe(401);
    expect(response.json()).toHaveProperty('message', 'Unauthorized');
  });

  it('should return 401 if invalid token is provided', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/alerts',
      headers: {
        Authorization: 'Bearer invalid-token'
      }
    });

    expect(response.statusCode).toBe(401);
    expect(response.json()).toHaveProperty('message', 'Unauthorized');
  });
});
