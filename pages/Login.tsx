import React, {useEffect, useState} from "react";
import {NextPage} from "next";
import {
    Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, FormControl, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, useDisclosure, VStack
} from "@chakra-ui/react";
import Link from "next/link";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";


export const Login: NextPage = () => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter()
    const {status} = useSession()

    const handleSubmit = async (e: any) => {
        e.preventDefault()

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
            await router.push("/TaskTracker")
        }
        else{
            onOpen();
        }
    }



    useEffect(() => {
        if(status === "authenticated") router.replace("/TaskTracker");
    }, [status]);


    return (
        <Box
            w={['full', 'md']}
            p={[8,10]}
            mt={[20, '10vh']}
            mx={'auto'}
            border={['none', '1px']}
            borderColor={['', 'gray.300']}
            borderRadius={10}
        >
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody bg={"#fed7d7"} borderRadius={10}>
                        <Alert status='error'>
                            <AlertIcon />
                            <AlertTitle>Login Error</AlertTitle>
                            <AlertDescription>Your email or password are incorrect</AlertDescription>
                        </Alert>
                    </ModalBody>
                    <ModalCloseButton />
                </ModalContent>
            </Modal>

            <VStack spacing={4} align={'flex-start'} w={'full'}>
                <VStack spacing={1} w={'full'}>
                    <Heading>Login to KronosPax</Heading>
                    <Text>Enter your email and password</Text>
                </VStack>
                <FormControl>
                    <FormLabel>Email Address</FormLabel>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} rounded='none' variant={'filled'} type={'email'} id={'email'} />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input value={pwd} onChange={(e) => setPwd(e.target.value)} rounded='none' variant={'filled'} type={'password'} id={'password'} />
                </FormControl>
                <HStack w={'full'} justify={'space-between'}>
                    <Button onClick={handleSubmit} rounded={'none'} colorScheme={'blue'} w={['full', 'auto']}>
                        Login
                    </Button>
                    <Button rounded={'none'} colorScheme={'blue'} w={['full', 'auto']}>
                        <Link href="/Register">Register</Link>
                    </Button>
                </HStack>
            </VStack>
        </Box>
    )
}
export default Login