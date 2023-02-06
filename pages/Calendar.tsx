import {NextPage} from "next";
import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    SimpleGrid,
    VStack
} from "@chakra-ui/react";
import Link from "next/link";
// import React, {useEffect} from "react";
// import Image from "next/image";
// import mockCal from '../public/calPoC.png'
// import {signOut, useSession} from "next-auth/react";
// import {useRouter} from "next/router";

const Calendar: NextPage = () => {
    // const {status, data} = useSession()
    // const router = useRouter()

    // useEffect(() => {
    //     if (status === "unauthenticated") router.replace("/");
    // }, [status]);

    // if (status === "authenticated") {
    return (
        <Box
            // w={['full', '5xl']}
            p={[8, 10]}
            // mt={[20, '10vh']}
            // mx='auto'
            // border={['none', '1px']}
            // borderColor={['', 'gray.300']}
            // borderRadius={10}
        >
            <Heading>KronosPax</Heading>
            <VStack align={"stretch"} >
                <SimpleGrid spacing={4}>
                    <Card align={'center'}>
                        <CardHeader>
                            <Heading size='md'> Customer dashboard</Heading>
                        </CardHeader>
                        <CardBody>
                            View a summary of all your customers over the last month.
                        </CardBody>
                        <CardFooter>
                            <Button>View here</Button>
                        </CardFooter>
                    </Card>
                    <Card align={'center'}>
                        <CardHeader>
                            <Heading size='md'> Customer dashboard</Heading>
                        </CardHeader>
                        <CardBody>
                            View a summary of all your customers over the last month.
                        </CardBody>
                        <CardFooter>
                            <Button>View here</Button>
                        </CardFooter>
                    </Card>
                    <Card align={'center'}>
                        <CardHeader>
                            <Heading size='md'> Customer dashboard</Heading>
                        </CardHeader>
                        <CardBody>
                            View a summary of all your customers over the last month.
                        </CardBody>
                        <CardFooter>
                            <Button>View here</Button>
                        </CardFooter>
                    </Card>
                    <Card align={'center'}>
                        <CardHeader>
                            <Heading size='md'> Customer dashboard</Heading>
                        </CardHeader>
                        <CardBody>
                            View a summary of all your customers over the last month.
                        </CardBody>
                        <CardFooter>
                            <Button>View here</Button>
                        </CardFooter>
                    </Card>
                </SimpleGrid>
                {/*<Button onClick={() => signOut({redirect: false})}>Sign out</Button>*/}
                <Button colorScheme={'blue'}>
                    <Link href="/TwilioPoC">Twilio PoC</Link>
                </Button>
            </VStack>
        </Box>
    )
    // }
    // return <Box>Loading</Box>
}

export default Calendar