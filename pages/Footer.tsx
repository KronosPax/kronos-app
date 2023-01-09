import React, {ReactNode} from "react";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Alert,
    AlertDescription,
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
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
import {FooterBox} from "../styles/FooterTest";
import KPLogo from "../public/kpLogo.svg";
import Image from "next/image";
const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    );
};

const Footer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    return (
        <>

            <FooterBox>
                <Box bottom={0} width={"100%"} color={useColorModeValue('gray.700', 'gray.200')}>
                <Container as={Stack} maxW={'6xl'} py={10}>
                    <SimpleGrid columns={{base: 1, sm: 2, md: 4}} spacing={8}>
                        <Stack align={'flex-start'}>
                            <ListHeader>About Us</ListHeader>
                        </Stack>
                        <Stack align={'flex-start'}>
                            <ListHeader>  <Link href={'#'}> Accessibility Policy</Link></ListHeader>
                        </Stack>
                        <Stack align={'flex-start'}>
                            <ListHeader>  <Link href={'#'}>Cookies Policy</Link></ListHeader>
                        </Stack>
                        <Stack align={'flex-start'}>
                            <ListHeader>  <Link href={'#'}>Legal</Link></ListHeader>
                        </Stack>
                    </SimpleGrid>
                </Container>
                <Box py={5}>
                    <Flex
                        align={'center'}
                        _before={{
                            content: '""',
                            borderBottom: '1px solid',
                            borderColor: 'brand.400',
                            flexGrow: 10,
                            mr: 1,
                        }}
                        _after={{
                            content: '""',
                            borderBottom: '1px solid',
                            borderColor: 'brand.400',
                            flexGrow: 10,
                            ml: 1,
                        }}>
                        <Image src={KPLogo} height={32} objectFit={"scale-down"}/>
                    </Flex>
                    <Text pt={6} fontSize={'sm'} textAlign={'center'}>
                        © 2022 KronosPax Calendar Solution. All rights reserved
                    </Text>
                </Box>
                </Box>
            </FooterBox>
        </>
    );
}

export default Footer;







