import {NextPage} from "next";
import {Box, Button, Heading, VStack} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export const Calendar: NextPage = () => {

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
            <VStack spacing={4} align={'center'} w={'full'}>
                <Heading>KronosPax Calendar</Heading>
                <Button colorScheme={'blue'}>
                    <Link href="/TwilioPoC">Twilio PoC</Link>
                </Button>
            </VStack>
        </Box>
    )
}

export default Calendar