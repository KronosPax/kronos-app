import React, {useEffect, useState} from "react";
import {NextPage} from "next";
import {
    Alert,
    AlertDescription,
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
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";


export const Login: NextPage = () => {
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const {isOpen, onOpen, onClose} = useDisclosure()
    const router = useRouter()
    const {status} = useSession()
    const {colorMode} = useColorMode()

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const res = await signIn('credentials', {
            email: email,
            password: pwd,
            redirect: false
        });
        console.log(res)
        if (res === undefined) {
            throw new Error('undefined')
        }
        if (res.ok === true) {
            await router.push("/TaskTracker")
        } else {
            onOpen();
        }
    }


    useEffect(() => {
        if (status === "authenticated") router.replace("/TaskTracker");
    }, [status]);
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
                            <AlertTitle>Login Error</AlertTitle>
                            <AlertDescription>Your email or password are incorrect</AlertDescription>
                        </Alert>
                    </ModalBody>
                    <ModalCloseButton/>
                </ModalContent>
            </Modal>


            <VStack spacing={1} w={'full'}>
                <Heading>Login to KronosPax</Heading>
                <Text>Enter your email and password</Text>
            </VStack>
            <br/>
            <Box as={"form"} onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel>Email Address</FormLabel>
                    <Input onChange={(e) => setEmail(e.target.value)} variant={'filled'} type={'email'}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input onChange={(e) => setPwd(e.target.value)} variant={'filled'} type={'password'}/>
                </FormControl>
                <br/>
                <HStack justify={'space-between'}>
                    <Button colorScheme={'teal'} type="submit">
                        Login
                    </Button>
                    <Button colorScheme={'teal'}>
                        <Link href="/Register">Register</Link>
                    </Button>
                </HStack>
            </Box>
        </Box>
    )
}
export default Login