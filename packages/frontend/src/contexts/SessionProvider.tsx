import { useCallback, useEffect, useState } from 'react'

import { Loading } from '../Loading'
import { LoginForm } from '../LoginForm'
import { getLoginToken, updateLoginToken } from '../session'
import { useSendRequest } from './ConnectionProvider'
import { useMessageHook } from './MessageProvider'

enum Status {
  Init,
  LoggingInWithToken,
  LoggingInWithPass,
  LoggedIn,
  NotLoggedIn,
  LoginFailed,
}

export const SessionProvider: React.FC<{}> = ({ children }) => {
  const [status, setStatus] = useState(Status.Init)

  const loginToken = getLoginToken()

  const loginWithPasswordRequest = useSendRequest('loginWithPassword'),
    loginWithTokenRequest = useSendRequest('loginWithToken')

  const loginWithPassword = useCallback(
    (password: string) => {
      loginWithPasswordRequest({ password })
      setStatus(Status.LoggingInWithPass)
    },
    [loginWithPasswordRequest]
  )

  useEffect(() => {
    if (status === Status.Init) {
      if (loginToken) {
        loginWithTokenRequest({ token: loginToken })
      } else {
        setStatus(Status.NotLoggedIn)
      }
    }
  }, [loginToken, loginWithTokenRequest, status])

  useMessageHook(
    'loginFailure',
    useCallback(() => {
      if (status === Status.LoggingInWithPass) {
        setStatus(Status.LoginFailed)
      } else {
        setStatus(Status.NotLoggedIn)
      }
    }, [status])
  )

  useMessageHook(
    'sessionStatusUpdate',
    useCallback((sessionStatus) => {
      updateLoginToken(sessionStatus.token)
      if (sessionStatus.loggedInAs) {
        setStatus(Status.LoggedIn)
      } else {
        setStatus(Status.Init)
      }
    }, [])
  )

  switch (status) {
    case Status.Init:
      return <Loading>{loginToken ? 'Logging in' : 'Loading'}</Loading>
    case Status.LoggingInWithPass:
    case Status.LoggingInWithToken:
      return <Loading>Logging in</Loading>
    case Status.LoginFailed:
      return <LoginForm failed onSubmit={loginWithPassword} />
    case Status.NotLoggedIn:
      return <LoginForm onSubmit={loginWithPassword} />
    case Status.LoggedIn:
      return <>{children}</>
  }
}
