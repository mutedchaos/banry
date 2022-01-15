import { StreamStatus } from './types'

export function isOnline(stream: StreamStatus) {
  return !!(stream.onlineSince && (!stream.offlineSince || stream.offlineSince < stream.onlineSince))
}
