import React from 'react'

import { ConnectionProvider } from './contexts/ConnectionProvider'
import { DataProvider } from './contexts/DataProvider'
import { ErrorProvider } from './contexts/ErrorProvider'
import { MessageProvider } from './contexts/MessageProvider'
import { SessionProvider } from './contexts/SessionProvider'
import { MainUI } from './MainUI'

function App() {
  return (
    <div className="App">
      <ErrorProvider>
        <ConnectionProvider>
          <MessageProvider>
            <SessionProvider>
              <DataProvider>
                <MainUI />
              </DataProvider>
            </SessionProvider>
          </MessageProvider>
        </ConnectionProvider>
      </ErrorProvider>
    </div>
  )
}

export default App
