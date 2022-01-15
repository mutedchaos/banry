import express from 'express'

import { connectIO } from './io'

const app = express()
const port = +(process.env.PORT || 3001)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

connectIO(server)
