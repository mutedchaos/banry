import express from 'express'

import { appConfig } from './appConfig'
import { testIntegrationRouter } from './integrations/test-integration'
import { twitchIntegrationRouter } from './integrations/twitch/twitch'
import { connectIO } from './io'

const app = express()
const port = +(process.env.PORT || 3001)

if (appConfig.publicDir) {
  app.use(express.static(appConfig.publicDir))
} else {
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
}

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

connectIO(server)

app.use('/test', testIntegrationRouter)
app.use('/twitch', twitchIntegrationRouter)
