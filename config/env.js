import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { PORT, SERVER_URL, NODE_ENV, MONGODB_URI, JWT_SECRET, JWT_EXPIRES_IN, ARCJET_KEY, ARCJET_ENV, QSTASH_URL
  , QSTASH_TOKEN } = process.env;
