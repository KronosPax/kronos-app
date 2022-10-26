import React, {useState} from "react";
import {NextPage} from "next";
import {Box, Button, FormControl, FormLabel, Heading, HStack, Input, Text, VStack} from "@chakra-ui/react";

export const Login: NextPage = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = () => {
        //e.preventDefault();
        console.log(email);
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
                    <Input value={pass} onChange={(e) => setPass(e.target.value)} rounded='none' variant={'filled'} type={'password'} id={'password'} />
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
                    <Button onClick={() => props} rounded={'none'} colorScheme={'blackAlpha'} w={['full', 'auto']}>
                        Register
                    </Button>
                </HStack>
            </VStack>
        </Box>
    )
}