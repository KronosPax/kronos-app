//import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import {SessionProvider} from "next-auth/react";
import {Session} from "next-auth";

function MyApp({ Component, pageProps }: AppProps<{session:Session}>) {
  return (
      <SessionProvider session={pageProps.session}>
          <ChakraProvider>
              <Component {...pageProps} />
          </ChakraProvider>
      </SessionProvider>
  )
}

export default MyApp
