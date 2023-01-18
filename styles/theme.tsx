// theme.tsx
import { extendTheme, type ThemeConfig } from '@chakra-ui/react' // import `extendTheme` function
import { mode } from '@chakra-ui/theme-tools'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'
const config: ThemeConfig = {  // add color mode config
    initialColorMode: 'light',
    useSystemColorMode: false,
}
const theme1 = extendTheme({
    colors: {
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
    },
})

const theme = extendTheme({ config, theme1 }) // extend the theme

export default theme