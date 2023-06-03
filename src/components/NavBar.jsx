import React, { useState } from "react";
import { Box, Flex, IconButton, Image, Text, Link } from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../assets/logo.jpg";
import { Link as NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { role, logged } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleToggleMenu = () => setShowMenu(!showMenu);
  const logout = () => {
    handleToggleMenu();
    navigate("/");
    dispatch({ type: "logout" });
  };
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={4}
      bg="gray.800"
      color="white">
      <Box>
        <Image src={logo} alt="Logo" h={10} rounded={"3xl"} />
      </Box>
      <IconButton
        display={{ base: "block", md: "none" }}
        aria-label="Toggle navigation"
        icon={<AiOutlineMenu />}
        onClick={handleToggleMenu}
        bg="transparent"
        color="white"
        _hover={{ bg: "transparent", color: "gray.500" }}
        _active={{ bg: "transparent", color: "gray.500" }}
      />
      <Box
        display={{ base: showMenu ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}>
        <Flex
          as="ul"
          listStyleType="none"
          align="center"
          justify={{ base: "center", md: "flex-end" }}
          flexDirection={{ base: "column", md: "row" }}
          padding={0}
          m={0}>
          <Box as="li" mx={4}>
            <Link onClick={handleToggleMenu} to="/" as={NavLink}>
              Home
            </Link>
          </Box>

          <Box as="li" display={`${!logged ? "block" : "none"}`} mx={4}>
            <Link onClick={handleToggleMenu} to="/account/login" as={NavLink}>
              Sign In
            </Link>
          </Box>
          <Box as="li" display={`${!logged ? "block" : "none"}`} mx={4}>
            <Link
              color="white"
              nClick={handleToggleMenu}
              to="/account"
              as={NavLink}>
              Sign Up
            </Link>
          </Box>
          <Box as="li" display={`${logged ? "block" : "none"}`} mx={4}>
            <Link
              onClick={handleToggleMenu}
              to={`${role == "admin" ? "/admin" : "/dashboard"}`}
              as={NavLink}>
              Dashboard
            </Link>
          </Box>
          <Box as="li" display={`${logged ? "block" : "none"}`} mx={4}>
            <Link onClick={logout} color="white" to="/account" as={NavLink}>
              Logout
            </Link>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Navbar;
