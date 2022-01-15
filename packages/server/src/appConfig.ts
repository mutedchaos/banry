import dotenv from 'dotenv'
dotenv.config()

export const appConfig = {
  validPassword: getEnv('VALID_PASSWORD'),
  jwtSecret: getEnv('JWT_SECRET'),
  jwtIdentity: getEnv('JWT_IDENTITY'),
  redisURL: getEnv('REDIS_URL'),

  // Optional:
  corsFrom: process.env.CORS_FROM,
  publicDir: process.env.PUBLIC_DIR,
  testIntegrationKey: process.env.TEST_INTEGRATION_KEY,
  twitchClientId: process.env.TWITCH_CLIENT_ID,
  twitchSecret: process.env.TWITCH_SECRET,
  twitchControlKey: process.env.TWITCH_CONTROL_KEY,
  twitchEventsubSecret: process.env.TWITCH_EVENTSUB_SECRET,
}

function getEnv(name: string) {
  const value = process.env[name]
  if (!value) throw new Error('Required value missing: ' + name)
  return value
}

export const defaultUserId = '0001'
