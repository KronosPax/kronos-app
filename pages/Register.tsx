import React, {useState} from "react";
import {NextPage} from "next";
import {Box, Button, FormControl, FormLabel, Heading, HStack, Input, Text, VStack} from "@chakra-ui/react";

export const Register: NextPage = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [Name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = () => {
        //e.preventDefault();
        console.log(Name);
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
                    <Heading>Register for KronosPax</Heading>
                    <Text>Enter your account information</Text>
                </VStack>

                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input value={Name} onChange={(e) => setName(e.target.value)} rounded='none' variant={'filled'} type={'text'} id={'Name'} />
                </FormControl>
                <FormControl>
                    <FormLabel>Phone Number</FormLabel>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} rounded='none' variant={'filled'} type={'tel'} id={'password'} />
                </FormControl>
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
                        Create Account
                    </Button>
                </HStack>
            </VStack>
        </Box>
    )
}