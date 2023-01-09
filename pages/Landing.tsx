import React, {ReactNode, useState} from "react";
import {NextPage} from "next";
import {signIn, useSession} from "next-auth/react";

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
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import theme from "../styles/theme";
import Image from 'next/image';
import {useRouter} from "next/router";
import weekends from '../public/weekends.gif'
import timeframeView from '../public/timeframeView.gif'
import KPLogo from "../public/Layer.png";



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
    const [regError, setRegError] = useState("")
    const [date, setDate] = useState(new Date())
    const [color, setColor] = useState("#aabbcc");
    const router = useRouter()

    const customTheme = extendTheme({ colorScheme: 'brand' })



    const handleSubmitL = async (e: any) => {
        e.preventDefault();

        const res = await signIn('credentials', {
            email: email,
            password: pwd,
            redirect: false
        });
        console.log(res)
        if (res === undefined){
            throw new Error('undefined')
        }
        if (res.ok === true){
            await router.push("/Calendar")
        }
        else{
            onOpen();
        }
    }

    const handleSubmitR = async (e: any) => {
        e.preventDefault();
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
            body: JSON.stringify(registerInfo)
        };

        const res: Response = await fetch('/api/auth/registerUser', requestOptions)
        console.log(res)
        if (!res.ok) {
            const badRes = await res.json()
            setRegError(badRes.error)
            onOpen();
        }else{
            const user = await res.json()
            console.log(user)
            await router.push("/")
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

                            {/* Login Information */}
                            <Box px={4}>
                                {/* <Logo h={16} pointerEvents="none" /> */}
                                <Box justifyContent={'space-between'}>
                                    <PopoverTrigger>
                                        <Button>Login</Button>
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
                                                <Button onClick={handleSubmitL} colorScheme='brand' rounded={'none'}  w={['full', 'auto']}>
                                                    <Link href="/kpCalendar">Login</Link>
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
                                            <FormControl paddingBlock={''}>
                                                <FormLabel>Password</FormLabel>
                                                <Input value={pwd} onChange={(e) => setPwd(e.target.value)} rounded='none' variant={'filled'} type={'password'} id={'password'} />
                                            </FormControl>
                                            {/* Text Alert Option */}
                                            <FormControl display='flex' onChange={setFlag.toggle}>
                                                <FormLabel htmlFor='text-alerts' mb='0'>
                                                    <Switch id='text-alerts'/>
                                                    {flag ? <FormControl>
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
                                                <Button onClick={handleSubmitR} rounded={'none'} colorScheme={'brand.890'} w={['full', 'auto']} justifyContent={"center"}>
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
                        </Stack>
                    </Flex>
                </HStack>
            </Popover>
                <br/>
            <HStack display={'flex'}  alignItems={'center'} justifyContent={'center'}>
                <FirstGif/>  {/* display first gif graphic --> weekend toggle */}
            </HStack>
                <br/>
            <HStack display={'flex'}  alignItems={'center'} justifyContent={'center'}>
                <SecondGif/>  {/* display first gif graphic --> timeframe view toggle */}
            </HStack>
                <br/>
            <Box>

            </Box>

        </>
    );
}

export default Landing