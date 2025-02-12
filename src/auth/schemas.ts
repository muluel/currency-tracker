export const emailPasswordSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 }
  }
};

export const errorResponseSchema = {
  type: 'object',
  properties: {
    message: { type: 'string' }
  }
};

export const registerResponseSchema = {
  type: 'object',
  properties: {
    token: { type: 'string' }
  }
};