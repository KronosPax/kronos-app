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
    AlertDialogHeader,
    useDisclosure,
    Input,
    FormControl,
    FormLabel,
    ModalOverlay,
    ModalBody,
    ModalHeader,
    Textarea,
    ModalContent,
    Modal,
    ModalCloseButton,
    ModalFooter
} from "@chakra-ui/react";
import FloatingNavbar from "../components/FloatingNavbar";
import {User} from "../utils/types";
import React, {useEffect, useRef} from "react";
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
                className: 'Business Managment',
                tasks: [
                    {
                        _id: 1,
                        taskName: 'Read chapter six',
                        desc: 'annotate in notebook',
                        dateDue: '03-23',
                        isTextAlert: true
                    },
                    {
                        _id: 2,
                        taskName: 'start paper',
                        desc: 'get outline started',
                        dateDue: '04-15',
                        isTextAlert: false
                    }
                ]
            },
            {
                _id: 2,
                className: 'Architecture',
                tasks: [
                    {
                        _id: 3,
                        taskName: 'hw1',
                        desc: 'registers what are they?!?!',
                        dateDue: '03-11',
                        isTextAlert: true
                    },
                    {
                        _id: 4,
                        taskName: 'choose final presentation topic',
                        desc: 'Aliens?',
                        dateDue: '03-27',
                        isTextAlert: false
                    }
                ]
            }
        ]
    };

    // Set up state for the confirmation dialog
    const {isOpen: isOpenDel, onOpen: onOpenDel, onClose: onCloseDel} = useDisclosure()
    const {isOpen: isOpenAdd, onOpen: onOpenAdd, onClose: onCloseAdd} = useDisclosure()
    const cancelRef = useRef(null)
    const {colorMode} = useColorMode()
    const {data: session, status} = useSession()
    const router = useRouter()
    // gets user email from session cookie
    console.log(session?.user?.email)

    useEffect(() => {
        if (status === "unauthenticated") router.replace("/")
    }, [status])


    function handleDeleteTask() {
        console.log('delete task')
        onCloseDel()
    }

    function handleSubmit(event: any) {
        event.preventDefault();

        console.log('submitted form')
        console.log(event)
        // code to handle form submission
        onCloseAdd();
    }


    if (status === "authenticated") {
        return (
            <>
                {/* Add task dialog */}
                <Modal isOpen={isOpenAdd} onClose={onCloseAdd}>
                    <ModalOverlay/>
                    <ModalContent as={"form"} onSubmit={handleSubmit}>
                        <ModalHeader>Add Task</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                                <FormControl id="task">
                                    <FormLabel>Task</FormLabel>
                                    <Input type={"text"} placeholder="Task"/>
                                </FormControl>
                                <FormControl id="description">
                                    <FormLabel>Description</FormLabel>
                                    <Textarea placeholder="Description"/>
                                </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" mt={4} colorScheme="teal">
                                Add Task
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* Delete task confirmation dialog */}
                <AlertDialog isOpen={isOpenDel} leastDestructiveRef={cancelRef} onClose={onCloseDel}>
                    <AlertDialogOverlay/>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Task
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete this task? You can&apos;t undo this action afterwards.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onCloseDel}>
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
                                            <IconButton onClick={onOpenAdd} bg="transparent" aria-label="Add Task"
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
                                                            <IconButton onClick={onOpenDel} bg="transparent"
                                                                        aria-label="Delete Task" icon={<DeleteIcon/>}/>
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