import { StreamStatus } from '@banry/common'
import styled from 'styled-components'

import { DurationSince } from '../DurationSince'

interface Props {
  stream: StreamStatus
  online?: boolean
}

const EmptyContainer = styled.div``

const MainContainer = styled.div`
  padding: 5px 10px;
  margin-bottom: 5px;
`

const OnlineContainer = styled.div``

const OfflineContainer = styled.div`
  opacity: 0.5;
`

const TwitchContainer = styled.div`
  background: #6441a5;
  color: white;
  text-shadow: 0 3px 3px black;
`

const Name = styled.div``
const Description = styled.div``
const Since = styled.div``

const InternalContainer = styled.div`
  background: lightgray;
  color: black;
`
const TestContainer = styled.div`
  background: orange;
  color: black;
`
const serviceContainers = new Map([
  ['twitch', TwitchContainer],
  ['internal', InternalContainer],
  ['test', TestContainer],
])

export function Stream({ stream, online }: Props) {
  const ServiceContainer = serviceContainers.get(stream.service) ?? EmptyContainer
  const StatusContainer = online ? OnlineContainer : OfflineContainer

  return (
    <StatusContainer>
      <ServiceContainer>
        <MainContainer>
          <Name>{stream.name}</Name>
          <Description>{stream.description}</Description>
          <Since>
            <DurationSince since={online ? stream.onlineSince : stream.offlineSince} />
          </Since>
        </MainContainer>
      </ServiceContainer>
    </StatusContainer>
  )
}
