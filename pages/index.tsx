import type { NextPage } from 'next'
import {Box, Button, Checkbox, FormControl, FormLabel, Heading, HStack, Input, Text, VStack} from "@chakra-ui/react";

const Home: NextPage = () => {
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
                      <Input rounded='none' variant={'filled'} type={'email'} />
                  </FormControl>
                  <FormControl>
                      <FormLabel>Password</FormLabel>
                      <Input rounded='none' variant={'filled'} type={'password'} />
                  </FormControl>
                  <HStack w={'full'} justify={'space-between'}>
                      <Checkbox>Remember me</Checkbox>
                      <Button variant={'link'} colorScheme={'blue'}>
                          Forgot Password
                      </Button>
                  </HStack>
                  <Button rounded={'none'} colorScheme={'blue'} w={['full', 'auto']}>
                      Login
                  </Button>
              </VStack>
          </Box>
  )
}

export default Home
