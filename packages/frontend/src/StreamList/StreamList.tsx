import { useContext } from 'react'
import styled from 'styled-components'

import { dataProviderContext, isOnline } from '../contexts/DataProvider'
import { sortStreams } from '../utils/sortStreams'
import { Stream } from './Stream'

const Container = styled.div``

export function StreamList() {
  const status = useContext(dataProviderContext)
  const online = sortStreams(status.filter(isOnline), 'onlineSince')
  const offline = sortStreams(
    status.filter((s) => !isOnline(s)),
    'offlineSince'
  )

  return (
    <Container>
      {online.map((stream) => (
        <Stream key={stream.name} online stream={stream} />
      ))}
      {offline.map((stream) => (
        <Stream key={stream.name} stream={stream} />
      ))}
    </Container>
  )
}
