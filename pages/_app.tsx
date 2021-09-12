import Head from 'next/head'
import type { AppProps /*, AppContext */ } from 'next/app'
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import '../src/styles/global.css'
import { geistThemes } from '../src/styles/theme'
import { Navigation } from '../src/components/navigation/navigation'
import React from 'react'
import { OrderContextProvider } from '../src/components/order/orderContext'
import { SessionContextProvider } from '../src/components/session/sessionContext'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GeistProvider themes={geistThemes} themeType="Custom">
        <CssBaseline />
        <SessionContextProvider>
          <OrderContextProvider>
            <Navigation />
            <Component {...pageProps} />
          </OrderContextProvider>
        </SessionContextProvider>
      </GeistProvider>
    </>
  )
}

export default App
