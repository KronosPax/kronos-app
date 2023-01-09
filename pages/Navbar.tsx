import React, {BaseSyntheticEvent, ReactNode, useState} from 'react'

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
    Center,
    ColorModeScript,
    Container,
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
    IconButton,
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
    SimpleGrid,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    Switch,
    Tag,
    Text,
    useBoolean,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    VStack,
} from '@chakra-ui/react'; // import Chakra UI functions

import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import styles from "../styles/Home.module.css";
import KPLogo from "../public/Layer.png";
import Image from "next/image";
import {signIn} from "next-auth/react";


const NavLink = ({children}:{children:ReactNode}) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);



const Navbar = () => {
    const [color, setColor] = useState("#aabbcc");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode()
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const sendMessage = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        setSuccess(false);
        const res = await fetch('/api/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone: phone, message: message }),
        });
        const apiResponse = await res.json();

        if (apiResponse.success) {
            setSuccess(true);
        } else {
            setError(true);
        }
        setLoading(false);
    };


    return (
        <>
            <Box padding={3} px={4}>
            <Popover>
                    <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                        <Box>
                        <Image src={KPLogo}/>
                        </Box>

                        <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>

                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>

                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    justifyContent={'space-between'}
                                    cursor={'pointer'}
                                    minW={0}
                                    background={'#FFFFFF'}>

                                    <Avatar size={'sm'} src={'https://avatars.dicebear.com/api/male/username.svg'}/>

                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                            src={'https://photos.google.com/photo/AF1QipPDCzplo2qAd8e8wPf9XwfXSun6CoOw1DfMbcbc'}
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        <p>
                                            Account Username
                                        </p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    {/*  <MenuItem>Your Servers</MenuItem> // sample for adding new menu item */}
                                    <MenuItem>Logout</MenuItem>
                                    <MenuItem>
                                        <Button rounded={'none'} colorScheme='teal' onClick={onOpen}>
                                            Account Settings
                                        </Button>
                                        <Drawer
                                            isOpen={isOpen}
                                            placement='right'
                                            onClose={onClose}
                                        >
                                            <DrawerOverlay />
                                            <DrawerContent>
                                                <DrawerCloseButton />
                                                <DrawerHeader> Edit Account Settings</DrawerHeader>
                                                {/* VISIBILITY STUFF */}
                                                <Accordion allowToggle>
                                                    <AccordionItem>
                                                        <h2>
                                                            <AccordionButton>
                                                                <Box flex='1' textAlign='center'>
                                                                    Visibility Options
                                                                </Box>
                                                                <AccordionIcon />
                                                            </AccordionButton>
                                                        </h2>
                                                        {/* Dark Mode */}
                                                        <AccordionPanel pb={4}>
                                                            <HStack w={'full'} justify={'center'}>
                                                                <Button size='sm' onClick={toggleColorMode}>
                                                                    {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
                                                                </Button>
                                                            </HStack>
                                                            {/* Color Picker */}
                                                            <br />
                                                            <HStack w={'full'} justify={'center'}>
                                                                <section className="custom-pointers example">
                                                                    <RgbaColorPicker />
                                                                    <HexColorInput color={color} onChange={setColor} />
                                                                </section>
                                                            </HStack>
                                                        </AccordionPanel>
                                                        {/* Color Test
                                                        <AccordionPanel pb={4}>
                                                            <HStack w={'full'} justify={'center'}>
                                                                <Button size='sm' onClick={toggleColorMode}>
                                                                    {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
                                                                   </Button>
                                                            </HStack>
                                                        </AccordionPanel> */}
                                                    </AccordionItem>
                                                </Accordion>
                                                <DrawerBody>
                                                    <Input placeholder='Quick Notes...' />
                                                </DrawerBody>

                                                <DrawerFooter>
                                                    <Button variant='outline' mr={3} onClick={onClose}>
                                                        Cancel
                                                    </Button>
                                                    <Button colorScheme='blue'>Save</Button>
                                                </DrawerFooter>
                                            </DrawerContent>
                                        </Drawer>
                                    </MenuItem>
                                </MenuList>
                            </Menu>

                            <PopoverTrigger>
                                <Button> SMS Alert </Button>
                            </PopoverTrigger>
                            <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                                <PopoverHeader pt={4} fontWeight='bold' border='0'>
                                    Please Enter Your Number and Message
                                </PopoverHeader>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverBody>

                                </PopoverBody>
                                <PopoverFooter
                                    border='0'
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='space-between'
                                    pb={4}
                                >
                                    <form className={styles.form} onSubmit={sendMessage}>

                                        <div className={styles.formGroup}>
                                            <label htmlFor='phone'>Phone Number</label>
                                            <input
                                                type={'password'}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder='Phone Number'
                                                className={styles.input}
                                                required
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor='message'>Message</label>
                                            <textarea
                                                onChange={(e) => setMessage(e.target.value)}
                                                id='message'
                                                required
                                                placeholder='Message'
                                                className={styles.textarea}
                                            ></textarea>
                                        </div>
                                        <button disabled={loading} type='submit' className={styles.button}>
                                            Send Message
                                        </button>
                                        {success && (
                                            <p className={styles.success}>Message sent successfully.</p>
                                        )}
                                        {error && (
                                            <p className={styles.error}>
                                                Something went wrong. Please check the number.
                                            </p>
                                        )}
                                    </form>
                                </PopoverFooter>
                            </PopoverContent>
                        </Stack>
                        </Flex>
                    </Flex>
            </Popover>
        </Box>
            <br/>
    </>
    )
}

export default Navbar;