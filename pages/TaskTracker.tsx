import {NextPage} from "next";
import {
    Box,
    Card,
    CardHeader,
    Heading,
    useColorMode,
    AccordionItem,
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Flex
} from "@chakra-ui/react";
import FloatingNavbar from "../components/FloatingNavbar";
import {User} from "../utils/types";
import React, {useEffect} from "react";
// import Image from "next/image";
// import mockCal from '../public/calPoC.png'
import {signOut, useSession, getSession } from "next-auth/react";
import {useRouter} from "next/router";

const TaskTracker: NextPage = () => {


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
        //TaskName has a limit of 20 chars
        {
            taskID: 1,
            className: 'nerp',
            taskName: '12345123451234512345',
            desc: 'test1 desc' +
                'jahdsfjkhasdlfjlkasdjfkl;asdjfkl;jasdl;' +
                'akdjfl;kajsdl;fkja;lsdkfj;asldjfal;skdfjasdfl;' +
                'alsdkfjakl;jsdfl;kjasl;dkjfkl;ajsdfkljasdlfk;jasdfkljas' +
                'aksdljfklasjdflk;jasdkl;jfl;kajsdfkljalk;sdfjal;skdjfl;kasjdf;l' +
                'aklsdjf;lkajsdfkl;jaskldfjakl;sdjfkl;asjdflkjaskld;jfaskl;jdf;klasjdfl;kajsd' +
                'klgajfdl;asfj;lkasdjfkla;sjdfkl;asdjfkl;ajsdl;kfjal;skdjfkl;asjdfkl;jasdfklj' +
                'jalksdjflkjasdlk;fjaklsdjflk;jasdfl;kjasdkl;fjakls;djfakljfdkasjfdslj;',
            dateDue: '1/1/23',
            isTextAlert: false
        },
        {taskID: 2, className: 'nerfp', taskName: 'test2', desc: 'test2 desc', dateDue: '2/2/23', isTextAlert: true},
        {taskID: 3, className: 'nessr', taskName: 'test3', desc: 'test3 desc', dateDue: '3/3/23', isTextAlert: false},
        {taskID: 4, className: 'neeerp', taskName: 'test4', desc: 'test4 desc', dateDue: '3/3/23', isTextAlert: false},
        {taskID: 45, className: 'need', taskName: 'test5', desc: 'test5 desc', dateDue: '3/3/23', isTextAlert: false},
    ];

    const testUser: User = {
        _id: 1,
        fName: 'Test',
        lName: 'User',
        classes: [
            {
                _id: 1,
                className: 'Class 1',
                tasks: [
                    {
                        _id: 1,
                        taskName: 'Task 1',
                        desc: 'Description of Task 1',
                        dateDue: '2022-12-31',
                        isTextAlert: true
                    },
                    {
                        _id: 2,
                        taskName: 'Task 2',
                        desc: 'Description of Task 2',
                        dateDue: '2023-01-01',
                        isTextAlert: false
                    }
                ]
            },
            {
                _id: 2,
                className: 'Class 2',
                tasks: [
                    {
                        _id: 3,
                        taskName: 'Task 3',
                        desc: 'Description of Task 3',
                        dateDue: '2023-01-02',
                        isTextAlert: true
                    },
                    {
                        _id: 4,
                        taskName: 'Task 4',
                        desc: 'Description of Task 4',
                        dateDue: '2023-01-03',
                        isTextAlert: false
                    }
                ]
            }
        ]
    };



    const groupedTask: GroupedTask = task.reduce((acc: GroupedTask, curr) => {
        if (!acc[curr.className]) {
            acc[curr.className] = [];
        }
        acc[curr.className].push(curr);
        return acc;
    }, {});


    const { data: session, status } = useSession()
    const router = useRouter()
    const test = getSession()
    console.log(test)
    console.log(session)

    useEffect(() => {
        if (status === "unauthenticated") router.replace("/");
    }, [status]);

    if (status === "authenticated") {

    return (
        <>
            <FloatingNavbar/>
            <Flex justifyContent="center" flexWrap="wrap" pt={55}>
                {Object.keys(groupedTask).map((classID) => {
                    const tasks = groupedTask[classID];
                    return (
                        <Card key={classID} width={'350px'} p={2} m={1} size={"lg"}
                              bg={colorMode === "light" ? "gray.200" : "gray.700"}>
                            <CardHeader>
                                <Heading>{classID}</Heading>
                            </CardHeader>
                            {tasks.map((task) => (
                                <Card key={task.taskName} my={1} size={"lg"}
                                      bg={colorMode === "light" ? "white" : "gray.600"}>
                                    <Accordion allowMultiple>
                                        <AccordionItem border={'0'}>
                                            <AccordionButton>
                                                <Box as="span" flex='1' textAlign='left' maxW={'65%'}>
                                                    {task.taskName}
                                                </Box>
                                                <Box as="span" flex='1' textAlign='right'>
                                                    Due:<br/>{task.dateDue}
                                                </Box>
                                                <AccordionIcon style={{position: 'relative', top: '-10px'}}/>
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
            </Flex>
            <Flex justifyContent="center" flexWrap="wrap" pt={55}>
                {testUser.classes.map((classObject) => {
                    return (
                        <Card key={classObject._id} width={'350px'} p={2} m={1} size={"lg"}
                              bg={colorMode === "light" ? "gray.200" : "gray.700"}>
                            <CardHeader>
                                <Heading>{classObject.className}</Heading>
                            </CardHeader>
                            {classObject.tasks.map((task) => (
                                <Card key={task._id} my={1} size={"lg"}
                                      bg={colorMode === "light" ? "white" : "gray.600"}>
                                    <Accordion allowMultiple>
                                        <AccordionItem border={'0'}>
                                            <AccordionButton>
                                                <Box as="span" flex='1' textAlign='left' maxW={'65%'}>
                                                    {task.taskName}
                                                </Box>
                                                <Box as="span" flex='1' textAlign='right'>
                                                    Due:<br />{task.dateDue}
                                                </Box>
                                                <AccordionIcon style={{ position: 'relative', top: '-10px' }} />
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
            </Flex>


        </>
    )
}else{
        return <Box>Loading</Box>
    }
}
export default TaskTracker