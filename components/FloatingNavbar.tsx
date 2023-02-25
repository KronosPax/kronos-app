import {Flex, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, useColorMode} from "@chakra-ui/react";
import Image from "next/image";
import kpLogo from "../public/kpLogo.svg";
import {
    ArrowRightIcon,
    EditIcon,
    HamburgerIcon,
    MoonIcon,
    RepeatIcon,
    SettingsIcon,
    SunIcon
} from "@chakra-ui/icons";
import React from "react";
import {useSession, signOut} from "next-auth/react";


const FloatingNavbar: React.FC = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    const {status} = useSession()


    return (
        <Flex as={'header'} position={"fixed"} w={'100%'} align={"center"} justify={"space-between"}
              bg={`mode.${colorMode}.header`} backdropFilter="saturate(180%) blur(5px)"
              zIndex={'50'} p={1} px={3}
        >
            <HStack>
                <Image width={40} height={40} src={kpLogo} alt={'KronosPax project logo'}/>
            </HStack>
            <HStack>
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
                        // variant='outline'
                    />
                    {status === "authenticated" ? (
                        <MenuList>
                            <MenuItem icon={<SettingsIcon/>}>
                                Settings
                            </MenuItem>
                            <MenuItem onClick={async () => {await signOut()
                            }} icon={<ArrowRightIcon/>}>
                                Sign Out
                            </MenuItem>
                        </MenuList>
                    ) : (
                        <MenuList>
                            <MenuItem icon={<RepeatIcon/>}>
                                Open Closed Tab
                            </MenuItem>
                            <MenuItem icon={<EditIcon/>}>
                                Open File...
                            </MenuItem>
                        </MenuList>
                    )}
                </Menu>
            </HStack>
        </Flex>
    )
};

export default FloatingNavbar;