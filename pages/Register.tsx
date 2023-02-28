import React, {useState} from "react";
import {NextPage} from "next";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    useColorMode,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import Link from "next/link";
import {useRouter} from "next/router";


export const Register: NextPage = () => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [phone, setPhone] = useState("");
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [regError, setRegError] = useState("")
    const {colorMode} = useColorMode()
    const router = useRouter()


    const handleSubmit = async (e: any) => {
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

        if (!res.ok) {
            const badRes = await res.json()
            setRegError(badRes.error)
            onOpen();
        } else {
            const user = await res.json()

            await router.push("/")
        }
    }

    return (
        <Box
            w={['full', 'md']}
            p={[8, 10]}
            mt={[20, '10vh']}
            mx={'auto'}
            border={'1px'}
            borderColor={'gray.500'}
            borderRadius={10}
            bg={colorMode === "light" ? "gray.300" : "gray.700"}
        >
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalBody bg={"#fed7d7"} borderRadius={10}>
                        <Alert status='error'>
                            <AlertIcon/>
                            <AlertTitle>{regError}</AlertTitle>
                        </Alert>
                    </ModalBody>
                    <ModalCloseButton/>
                </ModalContent>
            </Modal>
            <VStack as={'form'} onSubmit={handleSubmit}>
                <Heading>Register</Heading>
                <Text>Enter your account information</Text>
                <FormControl isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input onChange={(e) => setFName(e.target.value)} variant={'filled'}/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input onChange={(e) => setLName(e.target.value)} variant={'filled'} type={'text'}/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Email Address</FormLabel>
                    <Input onChange={(e) => setEmail(e.target.value)} variant={'filled'} type={'email'}/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input onChange={(e) => setPwd(e.target.value)} variant={'filled'} type={'password'}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Phone Number</FormLabel>
                    <Input onChange={(e) => setPhone(e.target.value)} variant={'filled'} type={'tel'}/>
                </FormControl>
                <HStack w={'full'} justify={'space-between'}>
                    <Button type='submit' colorScheme={'teal'}>
                        Create Account
                    </Button>
                    <Button colorScheme={'teal'}>
                        <Link href="/Login">Login Here</Link>
                    </Button>
                </HStack>
            </VStack>
        </Box>
    )
}

export default Register