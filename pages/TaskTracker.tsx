import {NextPage} from "next";
import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    useColorMode,
    Grid
} from "@chakra-ui/react";
import React from "react";
import FloatingNavbar from "../components/FloatingNavbar";
// import React, {useEffect} from "react";
// import Image from "next/image";
// import mockCal from '../public/calPoC.png'
// import {signOut, useSession} from "next-auth/react";
// import {useRouter} from "next/router";

const TaskTracker: NextPage = () => {

    // const {status, data} = useSession()
    // const router = useRouter()

    // useEffect(() => {
    //     if (status === "unauthenticated") router.replace("/");
    // }, [status]);

    // if (status === "authenticated") {


    const data = [
        { id: 1, title: 'Card 1', description: 'This is card 1' },
        { id: 2, title: 'Card 2', description: 'This is card 2' },
        { id: 3, title: 'Card 3', description: 'This is card 3' },
        { id: 4, title: 'Card 3', description: 'This is card 3' },
        { id: 5, title: 'Card 3', description: 'This is card 3' },
    ];

    // const data = [
    //     { id: 1, title: 'Card 1', description: 'This is card 1' +
    //             'lkgdsfkl;gjsdlfk;glsd;fkgl;sdfkgjklsdafjlk;asdjfklasj' +
    //             'lfasdkj;fklasjdfl;kasjdfl;kasjdf;lajsd;lfkjasdkl;fa' +
    //             'askldfj;klasdfj;klasjd;fklja;sdjf;aklsdjf;laksdj' },
    //     { id: 2, title: 'Card 2', description: 'This is card 2' },
    //     { id: 3, title: 'Card 3', description: 'This is card 3' },
    //     { id: 4, title: 'Card 3', description: 'This is card 3' },
    //     { id: 5, title: 'Card 3', description: 'This is card 3' },
    // ];

    const { colorMode } = useColorMode();

    return (
        <>
            <FloatingNavbar/>
                <Box mx={'auto'} pt={60} px={5}>
                    <Grid
                        templateColumns={[
                            "repeat(1, minmax(250px, 1fr))",
                            "repeat(2, minmax(250px, 1fr))",
                            "repeat(3, minmax(250px, 1fr))",
                            "repeat(4, minmax(250px, 1fr))",
                            "repeat(5, minmax(250px, 1fr))"
                        ]}
                    >
                        {/*for reference to get index info*/}
                        {/*{data.map((item, index) => (*/}
                        {data.map((item) => (
                            <Box key={item.id} p={2}>
                                <Card size={"lg"} bg={colorMode === "light" ? "gray.200" : "gray.700"}>
                                    <CardHeader>
                                        <Heading size={"md"}>{item.title}</Heading>
                                    </CardHeader>
                                    <CardBody>{item.description}</CardBody>
                                    <CardFooter justify={"center"}>
                                        <Button>View here</Button>
                                    </CardFooter>
                                </Card>
                            </Box>
                        ))}
                    </Grid>
                </Box>
                {/*    /!*<Button onClick={() => signOut({redirect: false})}>Sign out</Button>*!/*/}
                {/*    <Button colorScheme={'blue'}>*/}
                {/*        <Link href="/TwilioPoC">Twilio PoC</Link>*/}
                {/*    </Button>*/}
                {/*</VStack>*/}
        </>
    )}

export default TaskTracker