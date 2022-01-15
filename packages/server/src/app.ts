import express from 'express'

import { appConfig } from './appConfig'
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

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

connectIO(server)
