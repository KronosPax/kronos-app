import {NextPage} from "next";
import {Box, Heading, VStack} from "@chakra-ui/react";

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
            <VStack spacing={4} align={'flex-start'} w={'full'}>
                <Heading>KronosPax Calendar</Heading>
            </VStack>
        </Box>
    )
}

export default Calendar