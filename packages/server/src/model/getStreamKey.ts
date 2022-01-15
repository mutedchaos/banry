import { StreamIdentifier } from './StreamIdentifier'

export function getStreamKey(id: StreamIdentifier) {
  return `stream-status-${id.service}-${id.name}`
}
