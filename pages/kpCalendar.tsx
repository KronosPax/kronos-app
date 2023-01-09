import React, {ReactNode} from 'react'
import FullCalendar, {DateInput, formatDate} from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {createEventId, INITIAL_EVENTS} from '../utils/event-utils'
import {
    Box, Button,
    Container,
    extendTheme,
    Flex,
    Link,
    SimpleGrid,
    Stack,
    Text,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react'; // import Chakra UI functions
import Image from "next/image";

import KPLogo from '../public/kpLogo.svg'

import {MoonIcon, SunIcon} from "@chakra-ui/icons";

import Navbar from "./Navbar";

const customTheme = extendTheme({ colorScheme: 'brand' })



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

    render() {
        return (
            <>
                <Navbar/>

                <Box display={'flex'}  minHeight={"100%"}  fontSize={"14px"} fontFamily={"Arial, Helvetica Neue, Helvetica, sans-serif"}>
                    {this.renderSidebar()}
                    <Box flexGrow={1} px={4}>
                        {/* bg={useColorModeValue("#FFFFFF", "#1a202c")} */}
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
                       </Box>
                    </Box>
            </>
        )
    }



    renderSidebar() {
        return (

                <Box w={300}
                     lineHeight={1.5}
                     background={"#98A6c2"}
                     borderRightColor={"#d3e2e8"}>
                <Box padding={"2em"}>
                    <h2>Instructions</h2>
                    <ul>
                        <li>Select date or date range, when prompted create a new event title</li>
                        <li>Drag, drop, and resize events</li>
                        <li>Click an event to delete it</li>
                    </ul>
                </Box>
                <Box padding={"2em"}>
                    <label>
                        <input
                            type='checkbox'
                            checked={this.state.weekendsVisible}
                            onChange={this.handleWeekendsToggle}
                        ></input>
                         show weekends
                    </label>
                </Box>
                <Box padding={"2em"}>
                    <h4> Current Schedule ({this.state.currentEvents.length})</h4>
                    <ul>
                        {this.state.currentEvents.map(renderSidebarEvent)}
                    </ul>
                </Box>
            </Box>
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
            <b> {formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
            <i>{event.title}</i>
        </li>
    )
}




