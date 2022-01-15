import jwt from 'jsonwebtoken'

import { appConfig } from './appConfig'

const jwtConfig = {
  audience: appConfig.jwtIdentity,
  issuer: appConfig.jwtIdentity,
}

export function createToken(userId: string) {
  return jwt.sign({}, appConfig.jwtSecret, {
    ...jwtConfig,
    expiresIn: '10d',
    subject: userId,
  })
}

export function getUserIdFromToken(token: string) {
  const verified = jwt.verify(token, appConfig.jwtSecret, { ...jwtConfig })
  if (!verified.sub) throw new Error('Sub missing from token')
  return verified.sub
}
