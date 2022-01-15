import { StreamStatus } from '@banry/common'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'

import { Loading } from '../Loading'
import { useSendRequest } from './ConnectionProvider'
import { useMessageHook } from './MessageProvider'

type Ctx = Array<StreamStatus>

export const dataProviderContext = React.createContext<Ctx>(null as any)

export function isOnline(stream: StreamStatus) {
  return !!(stream.onlineSince && (!stream.offlineSince || stream.offlineSince < stream.onlineSince))
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [statuses, setStatuses] = useState<Ctx | null>(null)

  const getStreamStatuses = useSendRequest('getStreamStatuses')

  useEffect(() => {
    if (!statuses) {
      getStreamStatuses()
    }
  }, [getStreamStatuses, statuses])

  useMessageHook(
    'streamStatusUpdate',
    useCallback((event) => {
      setStatuses((oldStatuses) => {
        if (!oldStatuses) return [event]
        return [...oldStatuses.filter((s) => s.service !== event.service || s.name !== event.name), event]
      })
    }, [])
  )

  if (!statuses) return <Loading>Fetching</Loading>
  return <dataProviderContext.Provider value={statuses}>{children}</dataProviderContext.Provider>
}
