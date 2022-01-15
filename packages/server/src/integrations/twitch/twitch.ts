import express, { Request, Response, Router } from 'express'

import { appConfig } from '../../appConfig'
import { updateStreamStatus } from '../../model/updateStreamStatus'
import { authMiddleware } from './authMiddleware'
import { TwitchBody, TwitchChannelUpdate, TwitchStreamOffline, TwitchStreamOnline } from './TwitchBody'

const router = Router()
export const twitchIntegrationRouter = router

router.use(express.raw({ type: 'application/json' }))

if (!appConfig.twitchClientId || !appConfig.twitchSecret) {
  router.use((_req, res) => {
    res.status(501)
    res.send('Test integration not enabled')
  })
} else {
  router.use(authMiddleware)

  router.use((req, _res, next) => {
    if (req.headers['content-type'] === 'application/json') {
      req.body = JSON.parse(req.body)
    }
    next()
  })

  router.use<void, '', TwitchBody, void>(async (req, res) => {
    try {
      switch (req.headers['twitch-eventsub-message-type']) {
        case 'notification':
          await handleNotification(req, res)
          break
        case 'webhook_callback_verification':
          await handleCallbackVerification(req, res)
          return
        case 'revocation':
          console.log(req.body)
          break
      }
      res.status(204)
      return
    } catch (err: any) {
      console.error(err.stack)
      res.status(500)
    }
    res.sendStatus(204)
  })
}

function handleCallbackVerification(req: Request<any, any, TwitchBody, any>, res: Response) {
  if (!('challenge' in req.body)) throw new Error('Challenge is missing.')
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write(req.body.challenge)
  res.end()
}

async function handleNotification(req: Request<any, any, TwitchBody, any>, res: Response) {
  switch (req.body.subscription.type) {
    case 'channel.update': {
      const event = (req.body as TwitchChannelUpdate).event

      await updateStreamStatus({
        service: 'twitch',
        name: event.broadcaster_user_name,
        description: event.title,
      })

      break
    }
    case 'stream.online': {
      const event = (req.body as TwitchStreamOnline).event
      await updateStreamStatus({
        service: 'twitch',
        name: event.broadcaster_user_name,
        onlineSince: new Date(event.started_at),
      })
      break
    }
    case 'stream.offline': {
      const event = (req.body as TwitchStreamOffline).event
      await updateStreamStatus({
        service: 'twitch',
        name: event.broadcaster_user_name,
        online: false,
      })
      break
    }
  }

  res.sendStatus(204)
}
