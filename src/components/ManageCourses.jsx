import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  ButtonGroup,
} from "@chakra-ui/react";
import ComfirmDelete from "./ComfirmDelete";
import { Link as NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosFetch from "./../configs/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../redux-slice/coursesSlice";

const ManageCourses = () => {
  const mentorship = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosFetch().get("/courses");
        const { data } = response;
        dispatch(setCourses(data));
      } catch (error) {}
    })();
  }, []);

  return (
    <Box m={"auto"}>
      <Heading as="h2" color="white" textAlign="center" mb={10}>
        Manage course
      </Heading>
      <Flex
        justify="center"
        flexWrap={isLargeScreen ? "nowrap" : "wrap"}
        gap={isLargeScreen ? "6px" : "20px"}
        mx={{ base: "auto", md: "auto" }}
        maxW={{ base: "80vw", lg: "1200px" }}>
        {mentorship.map((plan, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={6}
            flex={isLargeScreen ? "1" : "0 0 calc(100% - 20px)"}
            mb={isLargeScreen ? 0 : 10}
            bg="gray.900">
            <Heading as="h3" mb={4} color="white" fontSize="xl">
              {plan.plan}
            </Heading>
            <Text color="white" mb={4}>
              {plan.description}
            </Text>
            <Text color="white" mb={4}>
              Price: {plan.price}
            </Text>
            <ButtonGroup>
              <ComfirmDelete props={{ id: plan.course_id }} />
              <Button colorScheme="green">
                <NavLink state={plan} to="/admin/edit-course">
                  Edit
                </NavLink>
              </Button>
            </ButtonGroup>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
export default ManageCourses;
