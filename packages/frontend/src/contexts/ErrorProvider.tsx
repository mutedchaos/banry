import React from 'react'
import { ReactNode } from 'react'
import styled from 'styled-components'

const ErrorPanel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background: #faa;
  white-space: pre-wrap;
  padding: 1em;
`

export class ErrorProvider extends React.Component<{ children: ReactNode }> {
  state: { error: null | string } = { error: null }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { error: error.stack ?? error.message ?? JSON.stringify(error) }
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return <ErrorPanel>{this.state.error}</ErrorPanel>
    }

    return this.props.children
  }
}
