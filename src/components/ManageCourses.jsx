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

const ManageCourses = () => {
  const mentorshipPlans = [
    {
      title: "Basic",
      price: "$100",
      description:
        "Get access to basic mentorship and learn the fundamentals of forex trading.",
    },
    {
      title: "Advanced",
      price: "$250",
      description:
        "Get access to advanced mentorship and learn advanced forex trading strategies.",
    },
    {
      title: "Premium",
      price: "$500",
      description:
        "Get access to premium mentorship and learn the most advanced forex trading strategies from experts.",
    },
  ];

  const isLargeScreen = useBreakpointValue({ base: false, lg: true });
  console.log("hello");

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
        {mentorshipPlans.map((plan, index) => (
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
              {plan.title}
            </Heading>
            <Text color="white" mb={4}>
              {plan.description}
            </Text>
            <Text color="white" mb={4}>
              Price: {plan.price}
            </Text>
            <ButtonGroup>
              <ComfirmDelete />
              <Button colorScheme="green">
                <NavLink to="/admin/edit-course">Edit</NavLink>
              </Button>
            </ButtonGroup>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
export default ManageCourses;
