import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import {SessionProvider} from "next-auth/react";
import {Session} from "next-auth";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps<{session:Session}>) {
  return (
      <SessionProvider session={pageProps.session}>
          <ChakraProvider theme={theme}>
              <link rel="icon" href="/KP_Transparent.ico"/>
              <Component {...pageProps} />
          </ChakraProvider>
      </SessionProvider>
  )
}

export default MyApp
