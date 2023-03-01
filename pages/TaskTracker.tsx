import {NextPage} from "next";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Card,
    CardHeader,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Switch,
    Textarea,
    Tooltip,
    useColorMode,
    useDisclosure
} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {
    AddIcon,
    ArrowRightIcon,
    CloseIcon,
    DeleteIcon,
    HamburgerIcon,
    MoonIcon,
    SettingsIcon,
    SunIcon
} from "@chakra-ui/icons";
import Image from "next/image";
import kpLogo from "../public/kpLogo.svg";
import useSWR from 'swr';


const TaskTracker: NextPage = () => {

    // Set up state
    const {isOpen: isOpenDelTask, onOpen: onOpenDelTask, onClose: onCloseDelTask} = useDisclosure()
    const {isOpen: isOpenDelClass, onOpen: onOpenDelClass, onClose: onCloseDelClass} = useDisclosure()
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
    const [deleteTaskId, setDeleteTaskId] = useState("")


    useEffect(() => {
        if (status === "unauthenticated") router.replace("/")
    }, [status, router])


    const handleDeleteClass = async (event: any) => {
        event.preventDefault();

        const classForm = {
            email: session?.user?.email ?? "",
            classId: classId
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(classForm)
        }

        await fetch('/api/deleteClass', requestOptions)

        await mutate()
        onCloseDelClass()

    }
    const handleDeleteTask = async (event: any) => {
        event.preventDefault();

        const taskForm = {
            email: session?.user?.email ?? "",
            taskId: deleteTaskId,
            classId: classId
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(taskForm)
        }

        await fetch('/api/deleteTask', requestOptions)

        await mutate()
        onCloseDelTask()
    }

    const handleTaskSubmit = async (event: any) => {
        event.preventDefault();


        const taskForm = {
            email: session?.user?.email ?? "",
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

        await fetch('/api/createTask', requestOptions)

        if (isTextAlert) {
            const smsMessage = taskName + " is due at: " + new Date(dateDue).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: "medium",
            })

            const smsForm = {
                message: smsMessage,
                dateDue: dateDue,
            }

            const schedulerOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(smsForm)
            }

            await fetch('/api/scheduleMessage', schedulerOptions)
        }


        setTaskName('')
        setDesc('')
        setDateDue(Date())
        setIsTextAlert(false)
        await mutate()
        onCloseAddTask()
    }

    const handleClassSubmit = async (event: any) => {
        event.preventDefault();


        const classForm = {
            email: session?.user?.email ?? "",
            className: className,
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(classForm)
        }


        await fetch('/api/createClass', requestOptions)

        setClassName('')
        await mutate()
        onCloseAddClass()
    }

    const userEmail = session?.user?.email ?? "";

    const fetcher = (url: RequestInfo | URL, userEmail: any) => fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userEmail),
    }).then((res) => res.json())

    const {
        data: user,
        isLoading,
        mutate
    } = useSWR(['/api/getUser', userEmail], ([url, userEmail]) => fetcher(url, userEmail))




    if (status === "authenticated" && !isLoading) {
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
                                    value={new Date(dateDue).toISOString().slice(0, 16)}
                                    onChange={(e) => setDateDue(e.target.value)}
                                    variant={'filled'}
                                />
                            </FormControl>
                            <br/>
                            <FormControl display='flex' alignItems='center'>
                                <FormLabel htmlFor='text-alerts' mb='0'>
                                    Enable text alerts?
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

                {/* Delete class confirmation dialog */}
                <AlertDialog isOpen={isOpenDelClass} leastDestructiveRef={cancelRef} onClose={onCloseDelClass}>
                    <AlertDialogOverlay/>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Class
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete this class? You can&apos;t undo this action afterwards.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onCloseDelClass}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={handleDeleteClass} ml={3}>
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
                    {user.classes.map((classObject: { _id: React.Key; className: string; tasks: { _id: React.Key; taskName: string; dateDue: string; desc: string; }[]; }) => {
                        return (
                            <Card key={classObject._id} width={'350px'} p={2} m={1} size={"lg"}
                                  bg={colorMode === "light" ? "gray.300" : "gray.700"} onClick={() => {
                                setClassId(String(classObject?._id || ""))
                            }}>
                                <Box>
                                    <Tooltip label="Delete Class" aria-label="A tooltip">
                                    <IconButton bg="transparent" aria-label="Delete Class" icon={<CloseIcon/>}
                                                onClick={onOpenDelClass}/>
                                    </Tooltip>
                                </Box>
                                <CardHeader>
                                    <Flex justifyContent="space-between" alignItems="center">
                                        <Heading>{classObject.className}</Heading>
                                        <Tooltip label="Add Task" aria-label="A tooltip">
                                            <IconButton bg="transparent" aria-label="Add Task" icon={<AddIcon/>}
                                                        onClick={onOpenAddTask}/>
                                        </Tooltip>
                                    </Flex>
                                </CardHeader>
                                {/* List task contained within class object */}
                                {classObject.tasks.map((task: { _id: React.Key; taskName: string; dateDue: string; desc: string; }) => (
                                    <Card key={task._id} my={1} size={"lg"}
                                          bg={colorMode === "light" ? "white" : "gray.600"}>
                                        <Accordion allowMultiple>
                                            <AccordionItem border={'0'}>
                                                <AccordionButton>
                                                    <Box as="span" flex='1' textAlign='left' maxW={'65%'}>
                                                        {task.taskName}
                                                    </Box>
                                                    <Box as="span" flex='1' textAlign='right' maxW={'35%'}>
                                                        Due:<br/>{new Date(task.dateDue).toLocaleString('en-US', {timeStyle: "short"})}
                                                        <br/>
                                                        {new Date(task.dateDue).toLocaleString('en-US', {dateStyle: 'medium'})}
                                                    </Box>
                                                    <AccordionIcon style={{position: 'relative', top: '-25px'}}/>
                                                </AccordionButton>
                                                <AccordionPanel>
                                                    <Flex justifyContent="space-between" alignItems="center">
                                                        <Box as="span" flex='1' textAlign='left' maxW={'85%'}>
                                                            {task.desc}
                                                        </Box>
                                                        <Tooltip label="Delete Task" aria-label="A tooltip">
                                                            <IconButton aria-label="Delete Task" icon={<DeleteIcon/>}
                                                                        bg="transparent" onClick={() => {
                                                                onOpenDelTask()
                                                                setDeleteTaskId(String(task._id))
                                                            }}/>
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
        return <Flex mt={60} justify={"center"} align={"center"}><Spinner size='xl'/></Flex>
    }
}
export default TaskTracker