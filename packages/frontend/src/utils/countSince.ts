import humanizeDuration from 'humanize-duration'
import { DateTime } from 'luxon'

export function countSince(date: Date | null) {
  if (!date) return 'n/a'

  const dt = DateTime.fromJSDate(date)
  const diff = dt.diffNow(['day', 'hours', 'minute'])
  return humanizeDuration(-diff.toMillis(), { units: ['y', 'mo', 'w', 'd', 'h', 'm'], round: true })
}
