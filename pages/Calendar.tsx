import {NextPage} from "next";
import {Box, Button, Heading, VStack} from "@chakra-ui/react";
import Link from "next/link";
import React, {useEffect} from "react";
import Image from "next/image";
import mockCal from '../public/calPoC.png'
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import MyCalendar from "../components/MyCalendar";


const Calendar: NextPage = () => {
    const {status, data} = useSession()
    const router = useRouter()


    useEffect(() => {
        if(status === "unauthenticated") router.replace("/");
    }, [status]);

    if(status === "authenticated")
        return (
            <Box>
            {/*//     <VStack align={'center'} w={'full'}>*/}
                    <Heading>KronosPax Calendar</Heading>
                    {/*<Heading>{JSON.stringify(data.user, null, 2)}</Heading>*/}
                    {/*<Image src={mockCal}/>*/}
                    <MyCalendar />
                    <Button onClick={() => signOut({redirect:false})}>Sign out</Button>
                    <Button colorScheme={'blue'}>
                        <Link href="/TwilioPoC">Twilio PoC</Link>
                    </Button>
            {/*//     </VStack>*/}
            </Box>
        )
    return <Box>
        Loading
    </Box>
}

export default Calendar