//import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import {SessionProvider} from "next-auth/react";
import {Session} from "next-auth";
import './main.css'

function MyApp({ Component, pageProps }: AppProps<{session:Session}>) {
  return (
      <SessionProvider session={pageProps.session}>
          <ChakraProvider>
              <link rel="icon" href="/KP_Transparent.ico"/>
              <Component {...pageProps} />
          </ChakraProvider>
      </SessionProvider>
  )
}

export default MyApp
