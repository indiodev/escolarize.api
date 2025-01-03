/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
|
| The `Env.create` method creates an instance of the Env service. The
| service validates the environment variables and also cast values
| to JavaScript data types.
|
*/

import { Env } from '@adonisjs/core/env'

export default await Env.create(new URL('../', import.meta.url), {
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  HOST: Env.schema.string({ format: 'host' }),
  LOG_LEVEL: Env.schema.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),

  /*
  |----------------------------------------------------------
  | Variables for configuring database connection
  |----------------------------------------------------------
  */
  //  DATABASE
  DB_HOST: Env.schema.string({ format: 'host' }),
  DB_PORT: Env.schema.number(),
  DB_USERNAME: Env.schema.string(),
  DB_PASSWORD: Env.schema.string.optional(),
  DB_DATABASE: Env.schema.string(),

  // STORAGE
  STORE_ACCESS_KEY_ID: Env.schema.string(),
  STORE_SECRET_ACCESS_KEY: Env.schema.string(),
  STORE_DEFAULT_REGION: Env.schema.string(),
  STORE_BUCKET_NAME: Env.schema.string(),

  // Paulo criou, ver se faz sentido
  APP_NAME: Env.schema.string(),
  SEND_GRID_API_KEY: Env.schema.string(),
  FRONTEND_URL: Env.schema.string(),
})
