import { ClientToServerEvents, ServerToClientEvents } from '@banry/common'
import React, { useCallback, useContext } from 'react'
import { ReactNode, useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

import { Loading } from '../Loading'

export const socketContext = React.createContext<Socket<ServerToClientEvents, ClientToServerEvents>>(null as any)

interface Props {
  children: ReactNode
}

export function ConnectionProvider({ children }: Props) {
  const [connected, setConnected] = useState(false)

  const [socket] = useState(() => io(process.env.REACT_APP_WEBSOCKET_ADDRESS || 'ws://localhost:3001'))

  useEffect(() => {
    socket.connect()
    socket.on('connect', () => {
      setConnected(true)
    })
    socket.on('disconnect', () => {
      setConnected(false)
    })
  }, [socket])

  if (!connected) return <Loading>Connecting</Loading>
  return <socketContext.Provider value={socket}>{children}</socketContext.Provider>
}

export function useSendRequest<T extends keyof ClientToServerEvents>(type: T) {
  const socket = useContext(socketContext)
  return useCallback(
    (...args: Parameters<ClientToServerEvents[T]>) => {
      socket.emit(type, ...args)
    },
    [socket, type]
  )
}
