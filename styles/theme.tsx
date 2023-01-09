// theme.tsx
import {extendTheme, type ThemeConfig} from '@chakra-ui/react' // import `extendTheme` function

const config: ThemeConfig = {  // add color mode config
    initialColorMode: 'light',
    useSystemColorMode: false,
}
const themeT = extendTheme({
    components: {
        Link: {
            baseStyle: {
                _focus: {
                    boxShadow: 'none'
                }
            }
        }
    }
})

const colors = {
        brand: {
            800: '#1a365d',
            820: '#153e75',
            840: '#2a69ac',
            860: '#237099',
            880: '#6eccff',
            890: '#656f82',
            700: "#28c959",
            720: "#56C926",
            400: '#e6a24c',
            100: "#f7fafc",     // off-white
            120: "#ffffff",     // white
            200: "#1a202c",
        },
        yellow:{
            50: '#fefce8',
            100: '#fef9c3',
            200: '#fef08a',
            300: '#fde047',
            400: '#facc15',
            500: '#eab308',
            600: '#ca8a04',
            700: '#a16207',
            800: '#854d0e',
            900: '#713f12',
        },
        lime:{
            50: '#f7fee7',
            100: '#ecfccb',
            200: '#d9f99d',
            300: '#bef264',
            400: '#a3e635',
            500: '#84cc16',
            600: '#65a30d',
            700: '#4d7c0f',
            800: '#3f6212',
            900: '#365314',
        },
        cyan:{
            50: '#ecfeff',
            100: '#cffafe',
            200: '#a5f3fc',
            300: '#67e8f9',
            400: '#22d3ee',
            500: '#06b6d4',
            600: '#0891b2',
            700: '#0e7490',
            800: '#155e75',
            900: '#164e63',
        },
        sky:{
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
        },
        indigo:{
            50: '#eef2ff',
            100: '#e0e7ff',
            200: '#c7d2fe',
            300: '#a5b4fc',
            400: '#818cf8',
            500: '#6366f1',
            600: '#4f46e5',
            700: '#4338ca',
            800: '#3730a3',
            900: '#312e81',
        },
        rose:{
            50: '#fff1f2',
            100: '#ffe4e6',
            200: '#fecdd3',
            300: '#fda4af',
            400: '#fb7185',
            500: '#f43f5e',
            600: '#e11d48',
            700: '#be123c',
            800: '#9f1239',
            900: '#881337',
        },
    };

const customTheme = extendTheme({ config, colors, themeT }); // extend the theme

export default customTheme;