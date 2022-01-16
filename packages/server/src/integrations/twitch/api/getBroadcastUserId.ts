import { redisClient } from '../../../model/redis'
import { makeTwitchAPIRequest } from './makeTwitchAPIRequest'

interface Response {
  data: [
    {
      id: string
      login: string
      display_name: string
      type: string
      broadcaster_type: string
      description: string
      profile_image_url: string
      offline_image_url: string
      view_count: number
      email: string
      created_at: string
    }
  ]
}

export async function getBroadcastUserId(channelName: string) {
  const resp = await makeTwitchAPIRequest(`helix/users?login=${encodeURIComponent(channelName)}`, 'GET', null)
  const data: Response = await resp.json()
  await redisClient.set(`twitch-user-info-${channelName}`, JSON.stringify(data))
  console.log(data)
  return data.data[0].id
}
