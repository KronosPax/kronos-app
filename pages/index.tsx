import * as React from 'react'
import { extendTheme, ChakraProvider } from '@chakra-ui/react' //import `ChakraProvider` and 'extendTheme' component
import type { NextPage } from 'next'
import {Landing} from "./Landing";

const colors = { // Extend the theme to include custom colors, fonts, etc
    brand: {
        900: '#1a365d',
        800: '#153e75',
        700: '#2a69ac',
        600: '#237099',
        500: '#6eccff',
        400: '#e6a24c',
        100: "#f7fafc",
        200: "#1a202c",
    },
}
const Home: NextPage = () => {
    return (
        <ChakraProvider>{
            <Landing/>
    }</ChakraProvider>
  )
}

export default Home


{/* _app.tsx

//import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Landing} from "./Landing";
import { ChakraProvider,
         extendTheme,
         ColorModeScript } from '@chakra-ui/react'
import * as React from "react";


const colors = { // Extend the theme to include custom colors, fonts, etc
    brand: {
        900: '#1a365d',
        800: '#153e75',
        700: '#2a69ac',
        600: '#237099',
        500: '#6eccff',
        400: '#e6a24c',
        100: "#f7fafc",
        200: "#1a202c",
    },
}

const theme = extendTheme({ colors })

// 3. Pass the `theme` prop to the `ChakraProvider`
function Home({ Component, pageProps }: AppProps) {
  return (
      <ChakraProvider theme={colors}>
        <Component {...pageProps} />
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Landing/>
      </ChakraProvider>
  )
}


export default Home





*/}



