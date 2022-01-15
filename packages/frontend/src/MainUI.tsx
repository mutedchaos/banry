import styled from 'styled-components'

import { Controls } from './Controls'
import { StreamList } from './StreamList/StreamList'
import { mainBackground } from './styles/colors'

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: ${mainBackground};
  display: flex;
  flex-direction: column;
`

const MainContainer = styled.div`
  flex-grow: 1;
`
const ControlContainer = styled.div`
  background: #888;
`

export function MainUI() {
  return (
    <Container>
      <MainContainer>
        <StreamList />
      </MainContainer>
      <ControlContainer>
        <Controls />
      </ControlContainer>
    </Container>
  )
}
