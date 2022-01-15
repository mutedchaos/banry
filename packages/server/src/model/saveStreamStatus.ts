import { StreamStatus } from '@banry/common'

import { getIO } from '../io'
import { ROOM_USERS } from '../rooms'
import { getStreamKey } from './getStreamKey'
import { redisClient } from './redis'

export async function saveStreamStatus(streamStatus: StreamStatus) {
  await redisClient.set(getStreamKey(streamStatus), JSON.stringify(streamStatus))
  getIO().in(ROOM_USERS).emit('streamStatusUpdate', streamStatus)
}
