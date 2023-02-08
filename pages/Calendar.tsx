import {NextPage} from "next";
import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
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

    const FloatingNavbar = () => (
        <>
            <Flex as={'header'} position={"fixed"} w={'100%'} align={"center"} justify={"space-between"}
                  backgroundColor="rgba(255,255, 255, 0.8)" backdropFilter="saturate(180%) blur(5px)"
                  zIndex={'50'} p={1}
            >
                <Heading>KronosPax</Heading>
                <Heading>KronosPax</Heading>
            </Flex>
        </>
    );

    // const {status, data} = useSession()
    // const router = useRouter()

    // useEffect(() => {
    //     if (status === "unauthenticated") router.replace("/");
    // }, [status]);

    // if (status === "authenticated") {
    return (
        <>
            <FloatingNavbar/>
            <Box p={55}>
                <VStack align={"stretch"}>
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
        </>
    )
    // }
    // return <Box>Loading</Box>
}

export default Calendar