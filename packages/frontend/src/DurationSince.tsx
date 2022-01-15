import { useCallback, useEffect, useState } from 'react'

import { countSince } from './utils/countSince'

export const DurationSince: React.VFC<{ since: string | null }> = ({ since }) => {
  const [counted, setCounted] = useState('')

  const updateCounted = useCallback(() => {
    setCounted(countSince(since))
  }, [since])

  useEffect(() => {
    updateCounted()
  }, [updateCounted])

  useEffect(() => {
    const interval = setInterval(() => {
      updateCounted()
    }, 60000)
    return () => {
      clearInterval(interval)
    }
  }, [updateCounted])

  if (!since) return <span>n/a</span>

  return <span>{counted}</span>
}
