import { appConfig } from '../../../appConfig'
import { getBroadcastUserId } from './getBroadcastUserId'
import { makeTwitchAPIRequest } from './makeTwitchAPIRequest'

export async function addSubscription(channel: string) {
  const types = ['channel.update', 'stream.online', 'stream.offline']
  for (const type of types) {
    const resp = await makeTwitchAPIRequest('helix/eventsub/subscriptions', 'POST', {
      type,
      version: '1',
      condition: { broadcaster_user_id: await getBroadcastUserId(channel) },
      transport: {
        method: 'webhook',
        callback: appConfig.host + '/twitch/hook',
        secret: appConfig.twitchEventsubSecret,
      },
    })

    console.log(await resp.text())
  }
}
