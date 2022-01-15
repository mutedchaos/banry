import { ServerToClientEvents } from '@banry/common'
import React, { ReactNode, useContext, useEffect, useMemo, useRef } from 'react'

import { socketContext } from './ConnectionProvider'

interface HandlerCtx {
  addHandler(type: keyof ServerToClientEvents, handler: any): string
  removeHandler(key: string): void
}

interface Handler {
  id: string
  type: string
  handler(...args: any[]): void
}

const handlerContext = React.createContext<HandlerCtx>(null as any)

let id = 1000

function getNextId() {
  return (++id).toString()
}

export function MessageProvider({ children }: { children: ReactNode }) {
  const socket = useContext(socketContext)
  const handlers = useRef<Handler[]>([]).current

  useEffect(() => {
    socket.onAny((type, ...args) => {
      for (const handler of handlers) {
        if (handler.type === type) {
          handler.handler(...args)
        }
      }
    })
  }, [handlers, socket])

  const handlerValue = useMemo<HandlerCtx>(
    () => ({
      addHandler(type, handler) {
        const id = getNextId()

        handlers.push({
          id,
          type,
          handler,
        })
        return id
      },
      removeHandler(key) {
        const index = handlers.findIndex((h) => h.id === key)
        if (index !== -1) {
          handlers.splice(index, 1)
        }
      },
    }),
    [handlers]
  )

  return <handlerContext.Provider value={handlerValue}>{children}</handlerContext.Provider>
}

export function useMessageHook<T extends keyof ServerToClientEvents>(eventType: T, handler: ServerToClientEvents[T]) {
  const ctx = useContext(handlerContext)

  useEffect(() => {
    const key = ctx.addHandler(eventType, handler)
    return () => {
      ctx.removeHandler(key)
    }
  }, [ctx, eventType, handler])
}
