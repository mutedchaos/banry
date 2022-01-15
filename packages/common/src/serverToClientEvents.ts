import { StreamStatus } from './types'

export type ServerToClientEvents = {
  streamStatusUpdate(status: StreamStatus): void
  sessionStatusUpdate(status: { loggedInAs: null | string; token: null | string }): void
  loginFailure(): void
}
/*
  
  
  | ({
      type: 'stream-status-update'
    } & StreamStatus)
  | { type: 'session-status-update'; loggedInAs: null | string; token: string | null }
  | { type: 'login-failure' }
*/
