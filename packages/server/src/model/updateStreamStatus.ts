import { StreamStatus, isOnline } from '@banry/common'

import { getStreamStatus } from './getStreamStatus'
import { saveStreamStatus } from './saveStreamStatus'

export async function updateStreamStatus({
  online,
  ...streamStatus
}: Omit<StreamStatus, 'onlineSince' | 'offlineSince'> & { online: boolean }) {
  const existing = await getStreamStatus(streamStatus)
  if (!existing) {
    await saveStreamStatus({
      ...streamStatus,
      onlineSince: online ? new Date() : null,
      offlineSince: null,
    })
  } else {
    await saveStreamStatus({
      ...existing,
      name: streamStatus.name,
      description: streamStatus.description,
      offlineSince: !online && isOnline(existing) ? new Date() : existing.offlineSince,
      onlineSince: online && !isOnline(existing) ? new Date() : existing.onlineSince,
    })
  }
}
