import {NextPage} from "next";
import {Box, Button, Heading, VStack} from "@chakra-ui/react";
import Link from "next/link";
import React, {useEffect} from "react";
import Image from "next/image";
import mockCal from '../public/calPoC.png'
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";

const Calendar: NextPage = () => {
    const {status, data} = useSession()
    const router = useRouter()

    useEffect(() => {
        if(status === "unauthenticated") router.replace("/Login");
    }, [status]);

    if(status === "authenticated")
        return (
            <Box
                w={['full', '2xl']}
                p={[8,10]}
                mt={[20, '10vh']}
                mx='auto'
                border={['none', '1px']}
                borderColor={['', 'gray.300']}
                borderRadius={10}
            >
                <VStack align={'center'} w={'full'}>
                    <Heading>KronosPax Calendar</Heading>
                    <Heading>{JSON.stringify(data.user, null, 2)}</Heading>
                    <Image src={mockCal}/>
                    <Button onClick={() => signOut({redirect:false})}>Sign out</Button>
                    <Button colorScheme={'blue'}>
                        <Link href="/TwilioPoC">Twilio PoC</Link>
                    </Button>
                </VStack>
            </Box>
        )
    return <Box>
        Loading
    </Box>
}

export default Calendar