import React, {ReactNode, useState} from "react";
import {NextPage} from "next";
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
} from '@chakra-ui/react'; // import Chakra UI functions
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import Image from 'next/image'

import weekends from '../public/weekends.gif'
import timeframeView from '../public/timeframeView.gif'

const FirstGif = () => {
    return (
        <>
            <figure>
                <Image
                    src={weekends}
                    alt="weekends gif"
                    width={480}
                    height={270}
                />
                <figcaption > Easily Transition Between Priorities </figcaption>
            </figure>
    </>

    )
}

const SecondGif = () => {
    return (
        <>
            <figure>
                <Image
                src={timeframeView}
                alt="timeframe gif"
                width={480}
                height={270}
                />
                <figcaption> Choose Between Varying Time Frame Views </figcaption>
            </figure>
        </>
    )
}

const NavLink = ({children}:{children:ReactNode}) => (
    <Link
        px={2} py={1} rounded={'md'} _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
    }} href={'#'}>
        {children}
    </Link>
);



export const Landing: NextPage = () => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [phone, setPhone] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode() //color mode constant set (chakra ui stuff)
    const [flag, setFlag] = useBoolean() //boolean constant set (chakra ui stuff)
    const btnRef = React.useRef()
    const [date, setDate] = useState(new Date())
    const [color, setColor] = useState("#aabbcc");

    const customTheme = extendTheme({ colorScheme: 'brand' })

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const loginInfo = {
            email: email,
            pwd: pwd,
            fName: fName,
            lName: lName,
            phone: phone
        };
        const registerInfo = {
            email: email,
            pwd: pwd,
            fName: fName,
            lName: lName,
            phone: phone
        };

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(registerInfo),
            body2: JSON.stringify(loginInfo)
        };

        const res: Response = await fetch('/api/registerUser', requestOptions)
        console.log(res)
        const user = await res.json()
        console.log(user)
        const res2: Response = await fetch('/api/loginUser', requestOptions)
        console.log(res2)
        const next= await res2.json()
        console.log(next)
        if (next != null) {
            location.href = "/Calendar";
        } else {
            onOpen();
        }
    }

    const initialFocusRef = React.useRef()

    return (
        <>
            <Popover>
                <HStack w={'full'} justify={'space-between'}>
                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalBody bg={"brand.400"} borderRadius={10}>
                                        <Alert status='error'>
                                            <AlertIcon />
                                            <AlertTitle>Login Error</AlertTitle>
                                            <AlertDescription>Your email or password are incorrect</AlertDescription>
                                        </Alert>
                                    </ModalBody>
                                    <ModalCloseButton />
                                </ModalContent>
                            </Modal>
                            <Box bg={useColorModeValue('brand.700', 'gray.900')} px={4}>
                                {/* <Logo h={16} pointerEvents="none" /> */}
                                <Box justifyContent={'space-between'}>
                                    <PopoverTrigger>
                                        <Button>Log In</Button>
                                    </PopoverTrigger>
                                    <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                                        <PopoverHeader pt={4} fontWeight='bold' border='0'>
                                            Please Enter Your Email and Password
                                        </PopoverHeader>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverBody>  {/* Email and Password  */}
                                            <FormControl>
                                                <FormLabel>Email Address</FormLabel>
                                                <Input value={email} onChange={(e) => setEmail(e.target.value)} rounded='none' variant={'filled'} type={'email'} id={'email'} />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel>Password</FormLabel>
                                                <Input value={pwd} onChange={(e) =>
                                                    setPwd(e.target.value)} rounded='none' variant={'filled'} type={'password'} id={'password'}/>
                                            </FormControl>
                                        </PopoverBody>
                                        <PopoverFooter
                                            border='0'
                                            display='flex'
                                            alignItems='center'
                                            justifyContent='space-between'
                                            pb={4}
                                        >
                                            <ButtonGroup size='sm'>
                                                <Button colorScheme='green' rounded={'none'} w={['full', 'auto']}>
                                                    <Link href="/Register">Register</Link>
                                                </Button>
                                                <Button colorScheme='teal' onClick={handleSubmit} rounded={'none'}  w={['full', 'auto']}>
                                                    Login
                                                </Button>
                                            </ButtonGroup>
                                        </PopoverFooter>
                                    </PopoverContent>
                                </Box>
                            </Box>
                            <Popover>
                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalBody bg={"#fed7d7"} borderRadius={10}>
                                            <Alert status='error'>
                                                <AlertIcon />
                                                <AlertTitle>User creation error</AlertTitle>
                                                <AlertDescription>Your account was not created</AlertDescription>
                                            </Alert>
                                        </ModalBody>
                                        <ModalCloseButton />
                                    </ModalContent>
                                </Modal>
                                <Box justifyContent={'space-between'}>
                                    <PopoverTrigger>
                                        <Button justifyContent={'space-between'}>Register</Button>
                                    </PopoverTrigger>
                                    <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                                        <PopoverHeader pt={4} fontWeight='bold' border='0'>
                                            Create a KronosPax Account
                                        </PopoverHeader>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverBody>  {/* CREATE ACCOUNT  */}
                                            <FormControl>
                                                <FormLabel>First Name</FormLabel>
                                                <Input value={fName} onChange={(e) => setFName(e.target.value)} rounded='none' variant={'filled'} type={'text'} id={'fName'} />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel>Last Name</FormLabel>
                                                <Input value={lName} onChange={(e) => setLName(e.target.value)} rounded='none' variant={'filled'} type={'text'} id={'lName'} />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel>Email Address</FormLabel>
                                                <Input value={email} onChange={(e) => setEmail(e.target.value)} rounded='none' variant={'filled'} type={'email'} id={'email'} />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel>Password</FormLabel>
                                                <Input value={pwd} onChange={(e) => setPwd(e.target.value)} rounded='none' variant={'filled'} type={'password'} id={'password'} />
                                            </FormControl>

                                            {/* Text Alert Option */}
                                            <FormControl display='flex' alignItems='center' onChange={setFlag.toggle}>
                                                <FormLabel htmlFor='text-alerts' mb='0'>
                                                    <Switch id='text-alerts'/>
                                                    {flag ? <FormControl>
                                                        Enable Text Message Alerts?
                                                        <FormLabel>Phone Number</FormLabel>
                                                        <Input value={phone} onChange={(e) => setPhone(e.target.value)} rounded='none' variant={'filled'} type={'tel'} id={'phone'} />
                                                    </FormControl> : 'Enable Text Message Alerts?'}

                                                </FormLabel>
                                            </FormControl>

                                            {/* Text Alert Option End */}

                                            {/*<HStack w={'full'} justify={'space-between'}>*/}
                                            {/*    <Checkbox>Remember me</Checkbox>*/}
                                            {/*    <Button variant={'link'} colorScheme={'blue'}>*/}
                                            {/*        Forgot Password*/}
                                            {/*    </Button>*/}
                                            {/*</HStack>*/}
                                            <HStack w={'full'} justify={'left'}>
                                                <Button onClick={handleSubmit} rounded={'none'} colorScheme={'theme1.400'} w={['full', 'auto']} justifyContent={"center"}>
                                                    Create Account
                                                </Button>
                                            </HStack>
                                        </PopoverBody>
                                        <PopoverFooter
                                            border='0'
                                            display='flex'
                                            alignItems='center'
                                            justifyContent='space-between'
                                            pb={4}
                                        >
                                        </PopoverFooter>
                                    </PopoverContent>
                                </Box>
                            </Popover>
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
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={'https://avatars.dicebear.com/api/male/username.svg'}
                                    />
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
                                        <p>{fName}</p>
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
                        </Stack>
                    </Flex>
                </HStack>
            </Popover>
        <br/>
            <HStack display={'flex'}  alignItems={'center'} justifyContent={'center'}>
                <FirstGif/>  {/* display first gif graphic --> weekend toggle */}
            </HStack>

            <HStack display={'flex'}  alignItems={'center'} justifyContent={'center'}>
                <SecondGif/>  {/* display first gif graphic --> timeframe view toggle */}
            </HStack>
        </>
    );
}

export default Landing