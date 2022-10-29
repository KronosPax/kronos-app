import React, {useState} from "react";
import {NextPage} from "next";
import {Box, Button, FormControl, FormLabel, Heading, HStack, Input, Text, VStack} from "@chakra-ui/react";
import Link from "next/link";


export const Login: NextPage = () => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [badLogin, setBadLogin] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const loginInfo = {
            email:email,
            pwd:pwd
        };
        // window.location.href = "/Calendar";
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginInfo)
        };

        fetch('/api', requestOptions)
            .then(response => response.json())
            .then(data => {if(data == "user authorized"){
                window.location.href = "/Calendar";
        }else{
                setBadLogin("true");
            }});
    }

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
                {/*<HStack w={'full'} justify={'space-between'}>*/}
                {/*    <Checkbox>Remember me</Checkbox>*/}
                {/*    <Button variant={'link'} colorScheme={'blue'}>*/}
                {/*        Forgot Password*/}
                {/*    </Button>*/}
                {/*</HStack>*/}
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