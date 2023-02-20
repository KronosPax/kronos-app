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
    Flex,
    IconButton,
    Tooltip,
    AlertDialog,
    Button,
    AlertDialogBody,
    AlertDialogOverlay,
    AlertDialogFooter,
    AlertDialogContent,
    AlertDialogHeader
} from "@chakra-ui/react";
import FloatingNavbar from "../components/FloatingNavbar";
import {User} from "../utils/types";
import React, {useEffect, useRef, useState} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {AddIcon, DeleteIcon} from "@chakra-ui/icons";

const TaskTracker: NextPage = () => {

    // for testing frontend
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

    // Set up state for the confirmation dialog
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef(null);
    const {colorMode} = useColorMode()
    const {data: session, status} = useSession()
    const router = useRouter()
    // gets user email from session cookie
    console.log(session?.user?.email)

    useEffect(() => {
        if (status === "unauthenticated") router.replace("/")
    }, [status])

    function handleAddTask() {
        //addTask endpoint
    }

    function handleDeleteTask() {
        console.log('delete task')
        onClose()
    }

    if (status === "authenticated") {
        return (
            <>
                {/* Add the confirmation dialog */}
                <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                    <AlertDialogOverlay/>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Task
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete this task? You can't undo this action afterwards.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={handleDeleteTask} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/*  */}
                <FloatingNavbar/>
                <Flex justifyContent="center" flexWrap="wrap" pt={55}>
                    {/* Builds out cards by class */}
                    {testUser.classes.map((classObject) => {
                        return (
                            <Card key={classObject._id} width={'350px'} p={2} m={1} size={"lg"}
                                  bg={colorMode === "light" ? "gray.200" : "gray.700"}>
                                <CardHeader>
                                    <Flex justifyContent="space-between" alignItems="center">
                                        <Heading>{classObject.className}</Heading>
                                        <Tooltip label="Add Task" aria-label="A tooltip">
                                            <IconButton onClick={handleAddTask} bg="transparent" aria-label="Add Task"
                                                        icon={<AddIcon/>}/>
                                        </Tooltip>
                                    </Flex>
                                </CardHeader>
                                {/* List task contained within class object */}
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
                                                        Due:<br/>{task.dateDue}
                                                    </Box>
                                                    <AccordionIcon style={{position: 'relative', top: '-10px'}}/>
                                                </AccordionButton>
                                                <AccordionPanel>
                                                    <Flex justifyContent="space-between" alignItems="center">
                                                        <Box as="span" flex='1' textAlign='left' maxW={'85%'}>
                                                            {task.desc}
                                                        </Box>
                                                        <Tooltip label="Delete Task" aria-label="A tooltip">
                                                            <IconButton onClick={() => setIsOpen(true)} bg="transparent"
                                                                        aria-label="Add Task" icon={<DeleteIcon/>}/>
                                                        </Tooltip>
                                                    </Flex>
                                                </AccordionPanel>
                                            </AccordionItem>
                                        </Accordion>
                                    </Card>
                                ))}
                            </Card>
                        )
                    })}
                </Flex>
            </>
        )
    } else {
        return <Box>Loading</Box>
    }
}
export default TaskTracker