import 'dotenv/config';
import { buildApp } from './bin/application';
import logger from './bin/utils/logger';


const start = async () => {
  const app = await buildApp();
  try {
    await app.listen({ port: parseInt(process.env.PORT || '8000') });
    logger.info('App started successfully');
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

start();