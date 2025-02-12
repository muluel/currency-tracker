export const alertResponseSchema = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    symbol: { type: 'string' },
    price: { type: 'number' },
    type: { type: 'string', enum: ['above', 'below'] },
    status: { type: 'string', enum: ['active', 'inactive'] },
    createdAt: { type: 'string' },
  }
};

export const errorResponseSchema = {
  type: 'object',
  properties: {
    message: { type: 'string' }
  }
};

export const createAlertSchema = {
  body: {
    type: 'object',
    required: ['symbol', 'price', 'type'],
    properties: {
      symbol: {
        type: 'string',
        pattern: '^[A-Z]{1,10}$'  // Example: only uppercase, max 10 chars
      },
      price: {
        type: 'number',
        minimum: 0
      },
      type: { type: 'string', enum: ['above', 'below'] },
    },
  }
};