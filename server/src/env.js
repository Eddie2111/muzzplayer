'use strict';
require ('dotenv').config();
const z = require('zod');

async function GetEnv() {
  try{
    const envSchema = z.object({
      PORT: z.string().default('3200'),
      DB_URL: z.string(),
      AWS_ACCESSKEYID: z.string(),
      AWS_SECRETKEY: z.string(),
      AWS_REGION: z.string(),
      AWS_BUCKET_NAME: z.string(),
    });
    const env = envSchema.parse(process.env);
    return env;
  } catch (error) {
    console.log('Invalid environment variables, PORT and DB_URL are required, please check .env file');
    throw error;
  }
}

module.exports = GetEnv;