import crypto from 'crypto'

import { Handler, Request } from 'express'

import { appConfig } from '../../appConfig'

const TWITCH_MESSAGE_ID = 'Twitch-Eventsub-Message-Id'.toLowerCase()
const TWITCH_MESSAGE_TIMESTAMP = 'Twitch-Eventsub-Message-Timestamp'.toLowerCase()
const TWITCH_MESSAGE_SIGNATURE = 'Twitch-Eventsub-Message-Signature'.toLowerCase()

// Prepend this string to the HMAC that's created from the message
const HMAC_PREFIX = 'sha256='

export const authMiddleware: Handler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (appConfig.twitchControlKey && authHeader === `Bearer ${appConfig.twitchControlKey}`) {
      return next()
    }

    const secret = appConfig.twitchEventsubSecret

    if (!secret) {
      res.status(500)
      throw new Error('Subscription has no secret')
    }

    const message = getHmacMessage(req)
    const hmac = HMAC_PREFIX + getHmac(secret, message)

    if (!verifyMessage(hmac, asString(req.headers[TWITCH_MESSAGE_SIGNATURE]))) {
      res.status(403)
      throw new Error('Verification failed')
    }

    next()
  } catch (err) {
    next(err)
  }
}

// Build the message used to get the HMAC.
function getHmacMessage(req: Request) {
  return asString(req.headers[TWITCH_MESSAGE_ID]) + asString(req.headers[TWITCH_MESSAGE_TIMESTAMP]) + req.body
}

// Get the HMAC.
function getHmac(secret: string, message: string) {
  return crypto.createHmac('sha256', secret).update(message).digest('hex')
}

// Verify whether your signature matches Twitch's signature.
function verifyMessage(hmac: string, verifySignature: string) {
  return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(verifySignature))
}

function asString(val: string | string[] | undefined) {
  if (typeof val === 'string') {
    return val
  }

  throw new Error('Invalid value')
}
