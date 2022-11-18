import React, {useState} from "react";
import {NextPage} from "next";
import {
    Alert, AlertDescription, AlertIcon, AlertTitle,
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
    const { isOpen, onOpen, onClose } = useDisclosure();
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
        console.log(res)
        if (!res.ok) {
            onOpen();
            const badRes = await res.json()
            console.log(badRes.error)
        }else{
            const user = await res.json()
            console.log(user)
            await router.push("/")
        }
    }

    return (
        <Box
            w={['full', 'md']}
            p={[8,10]}
            mt={[20, '10vh']}
            mx='auto'
            border={['none', '1px']}
            borderColor={['', 'gray.300']}
            borderRadius={10}
        >
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalBody bg={"#fed7d7"} borderRadius={10}>
                        <Alert status='error'>
                            <AlertIcon/>
                            <AlertTitle>User creation error</AlertTitle>
                            <AlertDescription>Your account was not created</AlertDescription>
                        </Alert>
                    </ModalBody>
                    <ModalCloseButton/>
                </ModalContent>
            </Modal>

            <VStack spacing={4} align={'flex-start'} w={'full'}>
                <VStack spacing={1} w={'full'}>
                    <Heading>Register for KronosPax</Heading>
                    <Text>Enter your account information</Text>
                </VStack>

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
                <FormControl>
                    <FormLabel>Phone Number</FormLabel>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} rounded='none' variant={'filled'} type={'tel'} id={'phone'} />
                </FormControl>
                {/*<HStack w={'full'} justify={'space-between'}>*/}
                {/*    <Checkbox>Remember me</Checkbox>*/}
                {/*    <Button variant={'link'} colorScheme={'blue'}>*/}
                {/*        Forgot Password*/}
                {/*    </Button>*/}
                {/*</HStack>*/}
                <HStack w={'full'} justify={'space-between'}>
                    <Button onClick={handleSubmit} rounded={'none'} colorScheme={'blue'} w={['full', 'auto']}>
                        Create Account
                    </Button>
                    <Button rounded={'none'} colorScheme={'blue'} w={['full', 'auto']}>
                        <Link href="/Login">Login Here</Link>
                    </Button>
                </HStack>
            </VStack>
        </Box>
    )
}

export default Register