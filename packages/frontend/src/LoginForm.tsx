import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import { CenteredFullPage } from './styles/FullPage'

interface Props {
  failed?: boolean
  onSubmit(password: string): void
}

const LoginFailed = styled.p`
  color: red;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  font-family: Verdana;
  > * {
    margin-bottom: 5px;
  }
`

export function LoginForm({ failed, onSubmit }: Props) {
  const [password, setPassword] = useState('')

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      onSubmit(password)
    },
    [onSubmit, password]
  )

  return (
    <CenteredFullPage>
      <Form onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        <button disabled={!password}>Log In</button>
        <LoginFailed style={{ visibility: failed ? 'visible' : 'hidden' }}>Login failed.</LoginFailed>
      </Form>
    </CenteredFullPage>
  )
}
