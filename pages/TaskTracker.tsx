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
    SimpleGrid,
    AccordionItem,
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionPanel
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


    // const data = [
    //     {id: 1, title: 'Card 1', description: 'This is card 1'},
    //     {id: 2, title: 'Card 2', description: 'This is card 2'},
    //     {id: 3, title: 'Card 3', description: 'This is card 3'},
    //     {id: 4, title: 'Card 3', description: 'This is card 3'},
    //     {id: 5, title: 'Card 3', description: 'This is card 3'},
    // ];

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

    const {colorMode} = useColorMode();

    interface Task {
        taskID: number;
        className: string;
        taskName: string;
        desc: string;
        dateDue: string;
        isTextAlert: boolean;
    }

    interface GroupedTask {
        [key: string]: Task[];
    }

    const task: Task[] = [
        {taskID: 1, className: 'nerp', taskName: 'test1', desc: 'test1 desc', dateDue: '1/1/23', isTextAlert: false},
        {taskID: 2, className: 'nerp', taskName: 'test2', desc: 'test2 desc', dateDue: '2/2/23', isTextAlert: true},
        {taskID: 3, className: 'derp', taskName: 'test3', desc: 'test3 desc', dateDue: '3/3/23', isTextAlert: false},
        {taskID: 4, className: 'yerp', taskName: 'test4', desc: 'test4 desc', dateDue: '3/3/23', isTextAlert: false},
    ];


    // const groupedTask: GroupedTask = task.reduce((acc: GroupedTask, curr) => {
    //     acc[curr.className] = acc[curr.className] || [];
    //     acc[curr.className].push(curr);
    //     return acc;
    // }, {});

    const groupedTask: GroupedTask = task.reduce((acc: GroupedTask, curr) => {
        if (!acc[curr.className]) {
            acc[curr.className] = [];
        }
        acc[curr.className].push(curr);
        return acc;
    }, {});


    return (
        <>
            <FloatingNavbar/>
            <Box mx="auto" pt={60} px={5} maxW={'1260px'}>
                <SimpleGrid spacing={2} templateColumns={"repeat(auto-fill, minmax(250px, 1fr))"}>
                    {Object.keys(groupedTask).map((classID) => {
                        const tasks = groupedTask[classID];
                        return (
                            <Card key={classID} p={2} size={"lg"} bg={colorMode === "light" ? "gray.200" : "gray.700"}>
                                <CardHeader>
                                    <Heading>{classID}</Heading>
                                </CardHeader>
                                {tasks.map((task) => (
                                    <Card my={.5} key={task.taskName} bg={colorMode === "light" ? "white" : "gray.600"}>
                                        <Accordion allowMultiple>
                                            <AccordionItem border={'0'}>
                                                <AccordionButton>
                                                    <Box as="span" flex='1' textAlign='left'>
                                                        {task.taskName}
                                                    </Box>
                                                    <AccordionIcon/>
                                                </AccordionButton>
                                                <AccordionPanel>
                                                    {task.desc}
                                                </AccordionPanel>
                                            </AccordionItem>
                                        </Accordion>
                                    </Card>
                                ))}
                            </Card>
                        );
                    })}
                </SimpleGrid>
                <SimpleGrid spacing={2} templateColumns={"repeat(auto-fill, minmax(250px, 1fr))"}>
                    {/*for reference to get index info*/}
                    {/*{data.map((item, index) => (*/}
                    {task.map((item) => (
                        <Card key={item.className} p={2} size={"lg"}
                              bg={colorMode === "light" ? "gray.200" : "gray.700"}>
                            <CardHeader>
                                <Heading>{item.taskName}</Heading>
                            </CardHeader>
                            <CardBody>{item.desc}</CardBody>
                            <CardFooter justify={"center"}>
                                <Button>View here</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </SimpleGrid>
            </Box>
            {/*    /!*<Button onClick={() => signOut({redirect: false})}>Sign out</Button>*!/*/}
            {/*    <Button colorScheme={'blue'}>*/}
            {/*        <Link href="/TwilioPoC">Twilio PoC</Link>*/}
            {/*    </Button>*/}
            {/*</VStack>*/}
        </>
    )
}
export default TaskTracker