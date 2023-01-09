//import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import {SessionProvider} from "next-auth/react";
import "../styles/globals.css";
import "../styles/Home.module.css";
import {Session} from "next-auth";
import Footer from "./Footer";
import customTheme from '../styles/theme'


function kpApp({ Component, pageProps }: AppProps<{session:Session}>) {
  return (
      <SessionProvider session={pageProps.session}>
          <ChakraProvider theme={customTheme}>
              <Component {...pageProps} />
              <Footer/>
          </ChakraProvider>
      </SessionProvider>
  )
}

export default kpApp
