import { useState } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link as NavLink } from "react-router-dom";

function StudentSideBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeItem, setActiveItem] = useState("dashboard");

  // List of navigation items
  const navItems = ["profile", "Courses", "change password"];

  return (
    <>
      <IconButton
        icon={<FaBars />}
        size="md"
        aria-label="Open Sidebar"
        onClick={onOpen}
        position="fixed"
        top="100"
        left="0"
        zIndex="999"
      />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent bgColor={"gray.900"}>
          <IconButton
            icon={<FaTimes />}
            aria-label="Close Sidebar"
            onClick={onClose}
            position="absolute"
            top="4"
            right="4"
            zIndex="999"
            backgroundColor="transparent"
            color="#fff"
            _hover={{ bg: "gray.800" }}
          />
          <DrawerBody p="0">
            <Box as="nav" fontSize="1.1rem" w="full">
              <Box
                p="4"
                to={`/dashboard`}
                as={NavLink}
                display="block"
                bg={activeItem === "dashboard" ? "gray.600" : "transparent"}
                _hover={{ bg: "gray.700" }}
                cursor="pointer"
                color="#fff"
                onClick={() => {
                  setActiveItem("dashboard");
                  onClose();
                }}>
                Dashboard
              </Box>
              <Box
                p="4"
                to={`/dashboard/password`}
                as={NavLink}
                display="block"
                bg={activeItem === "password" ? "gray.700" : "transparent"}
                _hover={{ bg: "gray.700" }}
                cursor="pointer"
                color="#fff"
                onClick={() => {
                  setActiveItem("password");
                  onClose();
                }}>
                Password
              </Box>
              <Box
                p="4"
                to={`/dashboard/profile`}
                as={NavLink}
                display="block"
                bg={activeItem === "profile" ? "gray.700" : "transparent"}
                _hover={{ bg: "gray.700" }}
                cursor="pointer"
                color="#fff"
                onClick={() => {
                  setActiveItem("profile");
                  onClose();
                }}>
                Profile
              </Box>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default StudentSideBar;
