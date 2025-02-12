import pino from 'pino';

const logger = pino({
  // eslint-disable-next-line no-undef
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
});

export default logger;