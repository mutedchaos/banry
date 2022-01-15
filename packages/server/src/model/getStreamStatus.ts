import { StreamStatus } from '@banry/common'

import { getStreamKey } from './getStreamKey'
import { redisClient } from './redis'
import { StreamIdentifier } from './StreamIdentifier'

export async function getStreamStatus(streamId: StreamIdentifier) {
  const str = await redisClient.get(getStreamKey(streamId))
  if (!str) return null
  return JSON.parse(str) as StreamStatus
}
