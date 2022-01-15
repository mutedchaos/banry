import styled from 'styled-components'

import { LogOutButton } from './LogOutButton'

const Container = styled.div`
  display: flex;
  > * {
    flex: 1;
  }
`

export function Controls() {
  return (
    <Container>
      <LogOutButton />
    </Container>
  )
}
