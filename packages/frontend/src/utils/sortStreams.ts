import { StreamStatus } from '@banry/common'

export function sortStreams(streams: StreamStatus[], key: 'onlineSince' | 'offlineSince'): StreamStatus[] {
  return [...streams].sort((streamA, streamB) => {
    const a = streamA[key],
      b = streamB[key]
    if (!a && !b) return 0
    if (!a) return 1
    if (!b) return 0

    return b.valueOf() - a.valueOf()
  })
}
