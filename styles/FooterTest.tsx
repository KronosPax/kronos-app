import React, {ReactNode} from "react";
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
    Center,
    ColorModeScript,
    Container,
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
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Stack,
    SimpleGrid,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    Switch,
    Tag,
    Text,
    useBoolean,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    VStack,
} from '@chakra-ui/react'; // import Chakra UI functions

import styled from 'styled-components';

export const FooterBox = styled.div`
    background: {useColorModeValue('gray.50', 'gray.900')};
    color: {useColorModeValue('gray.700', 'gray.200')};
    bottom: 0;
    width: 100%;



@media (max-width: 1000px) {
	padding: 70px 30px;
}
`;


export const LogoBox = styled.div`
    background: {useColorModeValue('gray.50', 'gray.900')};
    color: {useColorModeValue('gray.700', 'gray.200')};
    bottom: 0;
    width: 100%;



@media (max-width: 1000px) {
	padding: 70px 30px;
}
`;