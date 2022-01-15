import { Router } from 'express'

import { appConfig } from '../appConfig'
import { updateStreamStatus } from '../model/updateStreamStatus'

const router = Router()
export const testIntegrationRouter = router

if (!appConfig.testIntegrationKey) {
  router.use((_req, res) => {
    res.status(501)
    res.send('Test integration not enabled')
  })
} else {
  router.use((req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      res.sendStatus(401)
    } else if (authHeader !== `Bearer ${appConfig.testIntegrationKey}`) {
      res.sendStatus(403)
    } else {
      next()
    }
  })

  router.post<void, { ok: true }, void, { name: string; description?: string; online: string }>(
    '/',
    async (req, res) => {
      try {
        const { name, description, online } = req.query
        if (!name || typeof name !== 'string') throw new Error('Invalid name')
        if (description !== undefined && typeof description !== 'string') throw new Error('Invalid description')
        if (online !== 'true' && online !== 'false') throw new Error('Invalid online')

        await updateStreamStatus({ service: 'test', online: online === 'true', description: description ?? '', name })

        res.send({ ok: true })
      } catch (err: any) {
        res.status(400)
        res.send(err.stack)
      }
    }
  )
}
