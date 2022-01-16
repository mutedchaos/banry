import fetch from 'cross-fetch'
import qs from 'qs'

import { appConfig } from '../../../appConfig'
import { redisClient } from '../../../model/redis'

let token: string | null,
  validUntil = new Date(0),
  loaded = false

export async function getTwitchAuthenticationToken() {
  if (!loaded) {
    await loadFromPersistence()
  }
  if (!token || validUntil < new Date()) {
    await getNewToken()
  }

  if (!token) throw new Error('Internal error')
  return token
}

async function loadFromPersistence() {
  const persistedToken = await redisClient.get('twitch-token')
  const expiration = await redisClient.get('twitch-token-expiration')

  loaded = true
  if (!persistedToken || !expiration) return

  const expiresAt = new Date(expiration)
  if (expiresAt > new Date()) {
    token = persistedToken
    validUntil = expiresAt
  }
}

async function getNewToken() {
  interface Response {
    access_token: string
    refresh_token: string
    expires_in: number
    scope: string[]
    token_type: string
  }
  const { twitchSecret, twitchClientId } = appConfig

  const resp = await fetch(
    'https://id.twitch.tv/oauth2/token?' +
      qs.stringify({
        client_id: twitchClientId,
        client_secret: twitchSecret,
        grant_type: 'client_credentials',
      }),
    { method: 'POST' }
  )

  if (resp.status >= 400) {
    const text = await resp.text()
    console.error(text)
    throw new Error(text)
  }

  const data: Response = await resp.json()

  token = data.access_token
  validUntil = new Date(new Date().valueOf() + (data.expires_in - 60) * 1000)

  await redisClient.set('twitch-token', token)
  await redisClient.set('twitch-token-expiration', validUntil.valueOf().toString())
}
