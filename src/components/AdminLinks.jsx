import React from "react";
import {
  Box,
  Flex,
  Icon,
  Text,
  Grid,
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaUsers, FaCog, FaPen, FaStore, FaBook } from "react-icons/fa";
import { Link as NavLink } from "react-router-dom";

export default function AdminLinks() {
  const gridTemplateColumns = useBreakpointValue({
    base: "repeat(1, 1fr)",
    md: "repeat(2, 1fr)",
    lg: "repeat(4, 1fr)",
  });

  return (
    <Grid
      width={{ base: "100%", md: "100" }}
      p={{ base: "10px 20px", md: "20px 20px" }}
      gap={"2"}
      m={"auto"}
      templateColumns={gridTemplateColumns}>
      <GridItem
        as={NavLink}
        to={"/admin/student-table"}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        bgColor="gray.900"
        p={{ base: "5", md: "7" }}
        mb={{ base: "6", md: "0" }}>
        <Flex flexDir="column" justify={"center"} align="center">
          <Icon as={FaUsers} w={6} color="white" h={6} />
          <Text fontWeight="bold" color="white" fontSize="lg">
            Students
          </Text>
        </Flex>
      </GridItem>
      <GridItem
        p={{ base: "5", md: "7" }}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        as={NavLink}
        to={"/admin/course-form"}
        bgColor="gray.900"
        mb={{ base: "6", md: "0" }}>
        <Flex align="center" flexDir={"column"}>
          <Icon as={FaBook} color="white" w={6} h={6} mr="4" />
          <Text fontWeight="bold" color="white" fontSize="lg">
            Create Course
          </Text>
        </Flex>
      </GridItem>
      <GridItem
        p={{ base: "5", md: "7" }}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        as={NavLink}
        to={"/admin/manage-courses"}
        bgColor="gray.900"
        mb={{ base: "6", md: "0" }}>
        <Flex align="center" flexDir={"column"}>
          <Icon as={FaCog} color="white" w={6} h={6} mr="4" />
          <Text fontWeight="bold" color="white" fontSize="lg">
            Settings
          </Text>
        </Flex>
      </GridItem>
      <GridItem
        p={{ base: "5", md: "7" }}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        as={NavLink}
        to={"/admin/edit-course"}
        bgColor="gray.900"
        mb={{ base: "6", md: "0" }}>
        <Flex align="center" flexDir={"column"}>
          <Icon as={FaPen} color="white" w={6} h={6} mr="4" />
          <Text fontWeight="bold" color="white" fontSize="lg">
            Edit Course
          </Text>
        </Flex>
      </GridItem>
    </Grid>
  );
}
