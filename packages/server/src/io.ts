import { Server as HttpServer } from 'http'

import { ClientToServerEvents, ServerToClientEvents } from '@banry/common'
import { Server, Socket } from 'socket.io'

import { appConfig, defaultUserId } from './appConfig'
import { createToken, getUserIdFromToken } from './jwt'
import { getAllStreamStatuses } from './model/getAllStreamStatuses'
import { ROOM_UNAUTHENTICATED, ROOM_USERS, getUserRoom } from './rooms'

let io: null | Server<ClientToServerEvents, ServerToClientEvents> = null

export function connectIO(server: HttpServer) {
  io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
    // options
    cors: appConfig.corsFrom
      ? {
          origin: appConfig.corsFrom,
          methods: ['GET', 'POST'],
        }
      : undefined,
  })

  io.on('connection', (socket) => {
    console.log('Client connected')
    socket.join(ROOM_UNAUTHENTICATED)

    socket.on('loginWithPassword', (data) => {
      console.log('Login request.')
      if (data.password === appConfig.validPassword) {
        console.log('Login success')

        const userId = defaultUserId
        socket.leave(ROOM_UNAUTHENTICATED)

        socket.join(ROOM_USERS)
        socket.join(getUserRoom(userId))
        socket.rooms.add(getUserRoom(userId))
        socket.emit('sessionStatusUpdate', { loggedInAs: userId, token: createToken(userId) })

        attachSessionUserHandlers(socket)
      } else {
        console.log('Login failed.')
        socket.emit('loginFailure')
      }
    })

    socket.on('loginWithToken', (data) => {
      console.log('Login with token request.')
      try {
        const userId = getUserIdFromToken(data.token)
        console.log('Login success')
        socket.leave(ROOM_UNAUTHENTICATED)

        socket.join(ROOM_USERS)
        socket.join(getUserRoom(userId))
        socket.emit('sessionStatusUpdate', { loggedInAs: userId, token: createToken(userId) })

        attachSessionUserHandlers(socket)
      } catch (err: any) {
        console.log('Login failed: ' + err.message)
        socket.emit('loginFailure')
      }
    })
  })
}

export function getIO() {
  if (!io) throw new Error('IO not set up')
  return io
}

function attachSessionUserHandlers(socket: Socket<ClientToServerEvents, ServerToClientEvents>) {
  socket.on('getStreamStatuses', async () => {
    let any = false
    for await (const streamStatus of getAllStreamStatuses()) {
      socket.emit('streamStatusUpdate', streamStatus)
      any = true
    }
    if (!any) {
      socket.emit('streamStatusUpdate', {
        service: 'internal',
        name: 'No stream data available.',
        description: '',
        onlineSince: new Date(),
        offlineSince: null,
      })
    }
  })
}
