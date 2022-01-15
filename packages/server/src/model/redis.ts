import { createClient } from 'redis'

import { appConfig } from '../appConfig'

export const redisClient = createClient({
  url: appConfig.redisURL,
})

redisClient.connect()
