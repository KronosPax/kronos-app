import type { NextPage } from 'next'
import * as React from 'react'
import { extendTheme, ChakraProvider } from '@chakra-ui/react' //import `ChakraProvider` and 'extendTheme' component
import {Landing} from "./Landing";

const Home: NextPage = () => {

    return (
<<<<<<< Updated upstream
            <>
                <Login/>
            </>
  )
=======
        <ChakraProvider>{
            <Landing/>
        }</ChakraProvider>
    )
>>>>>>> Stashed changes
}

export default Home
