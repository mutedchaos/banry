import humanizeDuration from 'humanize-duration'
import { DateTime } from 'luxon'

export function countSince(date: string | null) {
  if (!date) return 'n/a'

  const dt = DateTime.fromISO(date)
  const diff = dt.diffNow(['day', 'hours', 'minute'])
  return humanizeDuration(-diff.toMillis(), { units: ['y', 'mo', 'w', 'd', 'h', 'm'], round: true })
}
