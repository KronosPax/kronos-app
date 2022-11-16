import React, {ReactNode, useState} from "react";
import {NextPage} from "next";
import brand from './api/theme';
import { HexColorPicker , HexColorInput , RgbaColorPicker } from "react-colorful"; // color picker and color input
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Avatar,
    Box,
    Button,
    ButtonGroup,
    ColorModeScript,
    Center,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    extendTheme,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Link,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Stack,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    Switch,
    Text,
    useBoolean,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    VStack,
} from '@chakra-ui/react'; // Import the extendTheme function
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {Logo} from "./Logo";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'


export const Test: NextPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode() //color mode constant set (chakra ui stuff)
    const [flag, setFlag] = useBoolean() //boolean constant set (chakra ui stuff)
    const btnRef = React.useRef()
    const [date, setDate] = useState(new Date())
    const [color, setColor] = useState("#aabbcc");

    const customTheme = extendTheme({ colorScheme: 'brand' })


    const initialFocusRef = React.useRef()

    return (
        <>

                <Box>
                    {/* Calendar  */}
                    <VStack spacing={4} align={'flex-start'} w={'full'}>
                        <VStack spacing={1} w={'full'}>
                            <Box className="calendar-container">
                                <Calendar onChange={setDate} value={date}/>
                            </Box>
                            <Box className="text-center">
                                Selected date: {date.toDateString()}
                            </Box>
                        </VStack>
                        {/* END Calendar  */}
                    </VStack>
                </Box>
        </>
    );
}

export default Test