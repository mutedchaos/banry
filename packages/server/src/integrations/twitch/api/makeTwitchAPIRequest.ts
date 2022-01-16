import fetch from 'cross-fetch'

import { appConfig } from '../../../appConfig'
import { getTwitchAuthenticationToken } from './getTwitchAuthenticationToken'

export async function makeTwitchAPIRequest(api: string, method: 'POST' | 'GET', body: any) {
  if (!appConfig.twitchClientId) throw new Error('Twich client id not configured')
  const url = `https://api.twitch.tv/${api}`
  const opts = {
    method,
    headers: {
      Authorization: `Bearer ${await getTwitchAuthenticationToken()}`,
      'Client-Id': appConfig.twitchClientId,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  }
  console.log(url, opts)
  const resp = await fetch(url, opts)
  if (resp.status >= 400) {
    throw new Error(await resp.text())
  }
  return resp
}
