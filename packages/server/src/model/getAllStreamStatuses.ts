import { StreamStatus } from '@banry/common'

import { redisClient } from './redis'

export async function* getAllStreamStatuses() {
  const keys = await redisClient.keys('stream-status-*')

  for (const key of keys) {
    const value = await redisClient.get(key)
    if (value) {
      yield JSON.parse(value) as StreamStatus
    }
  }
}
