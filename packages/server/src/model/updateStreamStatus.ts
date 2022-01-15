import { StreamStatus, isOnline } from '@banry/common'

import { getStreamStatus } from './getStreamStatus'
import { saveStreamStatus } from './saveStreamStatus'

export async function updateStreamStatus({
  online,
  ...streamStatus
}: Omit<StreamStatus, 'onlineSince' | 'offlineSince' | 'description'> & {
  online?: boolean
  description?: string
  onlineSince?: Date
}) {
  const existing = await getStreamStatus(streamStatus)
  if (!existing) {
    await saveStreamStatus({
      ...streamStatus,
      onlineSince: online ? new Date().toISOString() : null,
      offlineSince: null,
      description: streamStatus.description ?? '',
    })
  } else {
    await saveStreamStatus({
      ...existing,
      name: streamStatus.name,
      description: streamStatus.description ?? existing.description,
      offlineSince: online === false && isOnline(existing) ? new Date().toISOString() : existing.offlineSince,
      onlineSince: streamStatus.onlineSince
        ? streamStatus.onlineSince.toISOString()
        : online === true && !isOnline(existing)
        ? new Date().toISOString()
        : existing.onlineSince,
    })
  }
}
