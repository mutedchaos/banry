import styled from 'styled-components'

import { mainBackground } from './colors'

export const FullPage = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: ${mainBackground};
  color: white;
`

export const CenteredFullPage = styled(FullPage)`
  display: flex;
  align-items: center;
  justify-content: space-around;
`
