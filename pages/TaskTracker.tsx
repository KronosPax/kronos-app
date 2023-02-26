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
    ModalFooter,
    Switch,
    HStack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from "@chakra-ui/react";
import {User} from "../utils/types";
import React, {useEffect, useRef, useState} from "react";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {
    AddIcon,
    ArrowRightIcon,
    DeleteIcon,
    HamburgerIcon,
    MoonIcon,
    SettingsIcon,
    SunIcon
} from "@chakra-ui/icons";
import Image from "next/image";
import kpLogo from "../public/kpLogo.svg";


const TaskTracker: NextPage = () => {

    // for testing frontend
    const testUser: User = {
        _id: '1',
        fName: 'Test',
        lName: 'User',
        classes: [
            {
                _id: '6e69561d-a9c7-40d5-bd51-ce331ac4fb52',
                className: 'Business Management',
                tasks: [
                    {
                        _id: '2',
                        taskName: 'Read chapter six',
                        desc: 'annotate in notebook',
                        dateDue: new Date("2023-03-15T18:24:00"),
                        isTextAlert: true
                    },
                    {
                        _id: '2',
                        taskName: 'start paper',
                        desc: 'get outline started',
                        dateDue: new Date("2023-02-28T12:24:00"),
                        isTextAlert: false
                    }
                ]
            },
            {
                _id: '2',
                className: 'Architecture',
                tasks: [
                    {
                        _id: '1',
                        taskName: 'hw1',
                        desc: 'registers what are they?!?!',
                        dateDue: new Date("2023-03-19T13:24:00"),
                        isTextAlert: true
                    },
                    {
                        _id: '2',
                        taskName: 'choose final presentation topic',
                        desc: 'Aliens?',
                        dateDue: new Date("2023-03-01T17:24:00"),
                        isTextAlert: false
                    }
                ]
            }
        ]
    };

    // Set up state
    const {isOpen: isOpenDelTask, onOpen: onOpenDelTask, onClose: onCloseDelTask} = useDisclosure()
    const {isOpen: isOpenAddTask, onOpen: onOpenAddTask, onClose: onCloseAddTask} = useDisclosure()
    const {isOpen: isOpenAddClass, onOpen: onOpenAddClass, onClose: onCloseAddClass} = useDisclosure()
    const cancelRef = useRef(null)
    const {colorMode, toggleColorMode} = useColorMode()
    const {data: session, status} = useSession()
    const router = useRouter()
    const [taskName, setTaskName] = useState("")
    const [desc, setDesc] = useState("")
    const [dateDue, setDateDue] = useState(Date())
    const [isTextAlert, setIsTextAlert] = useState(false)
    const [classId, setClassId] = useState("")
    const [className, setClassName] = useState("")

    useEffect(() => {
        if (status === "unauthenticated") router.replace("/")
    }, [status])

    function handleDeleteTask() {
        console.log('delete task')
        onCloseDelTask()
    }

    const handleTaskSubmit = async (event: any) => {
        event.preventDefault();

        console.log('submitted form')

        const taskForm = {
            email: session?.user?.email,
            taskName: taskName,
            desc: desc,
            dateDue: dateDue,
            isTextAlert: isTextAlert,
            classId: classId
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(taskForm)
        }
        console.log(requestOptions)

        const res: Response = await fetch('/api/createTask', requestOptions)
        console.log(res)

        setTaskName('')
        setDesc('')
        setDateDue(Date())
        setIsTextAlert(false)

        onCloseAddTask()
    }

    const handleClassSubmit = async (event: any) => {
        event.preventDefault();

        console.log('submitted form')

        const classForm = {
            email: session?.user?.email,
            className: className,
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(classForm)
        }

        console.log(requestOptions)

        const res: Response = await fetch('/api/createClass', requestOptions)
        console.log(res)

        setClassName('')

        onCloseAddClass()
    }


    if (status === "authenticated") {
        return (
            <>
                {/* Add task modal */}
                <Modal isOpen={isOpenAddTask} onClose={onCloseAddTask}>
                    <ModalOverlay/>
                    <ModalContent as={"form"} onSubmit={handleTaskSubmit}
                                  bg={colorMode === "light" ? "gray.300" : "gray.700"}>
                        <ModalHeader>Add Task</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            {/* Form for add task */}
                            <FormControl isRequired>
                                <FormLabel>
                                    Task
                                </FormLabel>
                                <Input type={"text"} placeholder="New Task"
                                       onChange={(e) => setTaskName(e.target.value)} variant={'filled'}/>
                            </FormControl>
                            <br/>
                            <FormControl>
                                <FormLabel>
                                    Description
                                </FormLabel>
                                <Textarea placeholder="New Description" onChange={(e) => setDesc(e.target.value)}
                                          variant={'filled'}/>
                            </FormControl>
                            <FormControl isRequired>
                                <br/>
                                <FormLabel>
                                    Due Date
                                </FormLabel>
                                <Input
                                    placeholder="Select Date and Time"
                                    type="datetime-local"
                                    onChange={(e) => setDateDue(e.target.value)}
                                    variant={'filled'}
                                />
                            </FormControl>
                            <br/>
                            <FormControl display='flex' alignItems='center'>
                                <FormLabel htmlFor='text-alerts' mb='0'>
                                    Enable email alerts?
                                </FormLabel>
                                <Switch id='text-alerts' isChecked={isTextAlert} onChange={() => {
                                    setIsTextAlert(!isTextAlert)
                                }}/>
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
                <AlertDialog isOpen={isOpenDelTask} leastDestructiveRef={cancelRef} onClose={onCloseDelTask}>
                    <AlertDialogOverlay/>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Task
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete this task? You can&apos;t undo this action afterwards.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onCloseDelTask}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={handleDeleteTask} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/* add class modal */}
                <Modal isOpen={isOpenAddClass} onClose={onCloseAddClass}>
                    <ModalOverlay/>
                    <ModalContent as={"form"} onSubmit={handleClassSubmit}
                                  bg={colorMode === "light" ? "gray.300" : "gray.700"}>
                        <ModalHeader>
                            Add Class
                            <Input type={"text"} placeholder="New Class"
                                   onChange={(e) => setClassName(e.target.value)} variant={'filled'}/>
                        </ModalHeader>
                        <ModalCloseButton/>
                        <ModalFooter>
                            <Button type="submit" mt={4} colorScheme="teal">
                                Add Class
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* NavBar */}
                <Flex as={'header'} position={"fixed"} w={'100%'} align={"center"} justify={"space-between"}
                      bg={`mode.${colorMode}.header`} backdropFilter="saturate(180%) blur(5px)"
                      zIndex={'50'} p={1} px={3}
                >
                    <HStack>
                        <Image width={40} height={40} src={kpLogo} alt={'KronosPax project logo'}/>
                    </HStack>
                    <HStack>
                        <Button onClick={onOpenAddClass}>
                            Add Class
                        </Button>
                        <IconButton
                            icon={colorMode === "light" ? <MoonIcon/> : <SunIcon/>}
                            aria-label="Toggle dark mode"
                            onClick={toggleColorMode}
                        />
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<HamburgerIcon/>}
                            />
                            <MenuList>
                                <MenuItem icon={<SettingsIcon/>}>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={async () => {
                                    await signOut()
                                }} icon={<ArrowRightIcon/>}>
                                    Sign Out
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>
                </Flex>
                <Flex justifyContent="center" flexWrap="wrap" pt={55}>
                    {/* Builds out cards by class */}
                    {testUser.classes.map((classObject) => {
                        return (
                            <Card key={classObject._id} width={'350px'} p={2} m={1} size={"lg"}
                                  bg={colorMode === "light" ? "gray.300" : "gray.700"}>
                                <CardHeader>
                                    <Flex justifyContent="space-between" alignItems="center">
                                        <Heading>{classObject.className}</Heading>
                                        <Tooltip label="Add Task" aria-label="A tooltip">
                                            <IconButton bg="transparent" aria-label="Add Task" icon={<AddIcon/>}
                                                        onClick={() => {
                                                            setClassId(classObject?._id || "")
                                                            onOpenAddTask()
                                                        }}/>
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
                                                    <Box as="span" flex='1' textAlign='right' maxW={'35%'}>
                                                        Due:<br/>{task.dateDue.toLocaleString('en-US', {
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                    })}
                                                        <br/>
                                                        {task.dateDue.toLocaleString('en-US', {
                                                            month: 'numeric',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                        })}
                                                    </Box>
                                                    <AccordionIcon style={{position: 'relative', top: '-25px'}}/>
                                                </AccordionButton>
                                                <AccordionPanel>
                                                    <Flex justifyContent="space-between" alignItems="center">
                                                        <Box as="span" flex='1' textAlign='left' maxW={'85%'}>
                                                            {task.desc}
                                                        </Box>
                                                        <Tooltip label="Delete Task" aria-label="A tooltip">
                                                            <IconButton onClick={onOpenDelTask} bg="transparent"
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