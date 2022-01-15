import { ReactNode } from 'react'
import { BallTriangle as Indicator } from 'react-loader-spinner'
import styled from 'styled-components'

import { CenteredFullPage } from './styles/FullPage'

const Container = styled(CenteredFullPage)`
  font-family: Verdana, Geneva, Tahoma, sans-serif;

  letter-spacing: 8px;
`

const InnerContainer = styled.div`
  display: flex;
  height: 150px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export function Loading({ children }: { children: ReactNode }) {
  return (
    <Container>
      <InnerContainer>
        <div>{children}</div>
        <div>
          <Indicator color="white" height={80} width={80} />
        </div>
      </InnerContainer>
    </Container>
  )
}
