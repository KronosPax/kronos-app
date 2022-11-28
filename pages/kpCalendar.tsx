import React, {ReactNode, useState} from 'react'
import FullCalendar, { DateInput, formatDate} from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {INITIAL_EVENTS, createEventId} from '../utils/event-utils'
import { HexColorPicker , HexColorInput , RgbaColorPicker } from "react-colorful"; // color picker and color input

import Calendar from '@fullcalendar/react'; // suggested solution from https://stackoverflow.com/questions/66750199/fullcalendar-nextjs-dynamic-import-doesnt-show-calendar

import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Avatar,
    Box,
    Button,
    ButtonGroup,
    ColorModeScript,
    Center,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    extendTheme,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Stack,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    Switch,
    Text,
    useBoolean,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    VStack,
} from '@chakra-ui/react'; // import Chakra UI functions
import {MoonIcon, SunIcon} from '@chakra-ui/icons';
import {NextPage} from "next";


const NavLink = ({children}:{children:ReactNode}) => (
    <Link
        px={2} py={1} rounded={'md'} _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
    }} href={'#'}>
        {children}
    </Link>
);


export default class KpCalendar extends React.Component {

    state = {
        weekendsVisible: true,
        currentEvents: []
    }

    // attempt to create constants for user info and color mode options / visibility
    private toggleColorMode: any;
    private colorMode: any;

   // const [email, setEmail] = useState(""); // user email constant
   // const [pwd, setPwd] = useState(""); // user password constant
   // const [fName, setFName] = useState(""); // user first name constant
   // const [lName, setLName] = useState(""); // user last name constant
   // const [phone, setPhone] = useState(""); // user phone number constant
   // const { isOpen, onOpen, onClose } = useDisclosure(); // use disclosure constant function declaration
   // const { colorMode, toggleColorMode } = useColorMode() //color mode constant set (chakra ui stuff)
   // const [flag, setFlag] = useBoolean() //boolean constant set (chakra ui stuff)
   // const btnRef = React.useRef() // react button constant declaration
   // const [date, setDate] = useState(new Date()) // useState constant for setting date declared ( probably not necessary anymore --> was used for react-calendar, currently using react-fullcalendar)
   // const [color, setColor] = useState("#aabbcc");

   // const customTheme = extendTheme({ colorScheme: 'brand' })




    render() {
        return (
            <>
            <Popover>
                <HStack w={'full'} justify={'space-between'}>
                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button onClick={this.toggleColorMode}>
                                {this.colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>
                        </Stack>
                    </Flex>
                </HStack>
            </Popover>

            <div className='kp-cal'>
                {this.renderSidebar()}
                <div className='kp-cal-main'>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        initialView='dayGridMonth'
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={this.state.weekendsVisible}
                        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                        select={this.handleDateSelect}
                        eventContent={renderEventContent} // custom render function
                        eventClick={this.handleEventClick}
                        eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                        /* you can update a remote database when these fire:
                        eventAdd={function(){}}
                        eventChange={function(){}}
                        eventRemove={function(){}}
                        */
                    />
                </div>
            </div>
            </>
        )
    }

    renderSidebar() {
        return (
            <div className='kp-cal-sidebar'>
                <div className='kp-cal-sidebar-section'>
                    <h2>Instructions</h2>
                    <ul>
                        <li>Select date or date range, when prompted create a new event title</li>
                        <li>Drag, drop, and resize events</li>
                        <li>Click an event to delete it</li>
                    </ul>
                </div>
                <div className='kp-cal-sidebar-section'>
                    <label>
                        <input
                            type='checkbox'
                            checked={this.state.weekendsVisible}
                            onChange={this.handleWeekendsToggle}
                        ></input>
                        show weekends
                    </label>
                </div>
                <div className='kp-cal-sidebar-section'>
                    <h4> Current Schedule ({this.state.currentEvents.length})</h4>
                    <ul>
                        {this.state.currentEvents.map(renderSidebarEvent)}
                    </ul>
                </div>
            </div>
        )
    }

    handleWeekendsToggle = () => {
        this.setState({
            weekendsVisible: !this.state.weekendsVisible
        })
    }

    handleDateSelect = (selectInfo: { view: { calendar: any }; startStr: any; endStr: any; allDay: any }) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
    }

    handleEventClick = (clickInfo: { event: { title: any; remove: () => void } }) => {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
        }
    }

    handleEvents = (events: any) => {
        this.setState({
            currentEvents: events
        })
    }

}

function renderEventContent(eventInfo: { timeText: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; event: { title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined } }) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

function renderSidebarEvent(event: { id: React.Key | null | undefined; start: DateInput; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }) {
    return (
        <li key={event.id}>
            <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
            <i>{event.title}</i>
        </li>
    )
}

{/*     TRYING TO CREATE FUNCTIONS INSTEAD OF CONSTANTS



function BasicUsage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />


                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


function StyleColorMode() {
    const { toggleColorMode } = useColorMode()

    const bg = useColorModeValue('red.500', 'red.200')
    const color = useColorModeValue('white', 'gray.800')

    return (
        <>
            <Box mb={4} bg={bg} color={color}>
                This box's style will change based on the color mode.
            </Box>
            <Button size='sm' onClick={toggleColorMode}>
                Toggle Mode
            </Button>
        </>
    )
}
*/}
