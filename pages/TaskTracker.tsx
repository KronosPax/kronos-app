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
        </>
    )
}
export default TaskTracker