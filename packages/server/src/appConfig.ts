export const appConfig = {
  validPassword: getEnv('VALID_PASSWORD'),
  jwtSecret: getEnv('JWT_SECRET'),
  jwtIdentity: getEnv('JWT_IDENTITY'),
  corsFrom: process.env.CORS_FROM,
  publicDir: process.env.PUBLIC_DIR,
}

function getEnv(name: string) {
  const value = process.env[name]
  if (!value) throw new Error('Required value missing: ' + name)
  return value
}

export const defaultUserId = '0001'
