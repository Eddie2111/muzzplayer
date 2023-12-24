'use strict';
const z = require('zod');

async function GetEnv() {
  try{
    const envSchema = z.object({
      PORT: z.string().default('3200'),
      DB_URL: z.string(),
    });
    const env = envSchema.parse(process.env);
    return env;
  } catch (error) {
    console.log('Invalid environment variables, PORT and DB_URL are required, please check .env file');
    throw error;
  }
}

module.exports = GetEnv;