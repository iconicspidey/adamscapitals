import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import SignupModal from "./Modal";
import { useQuery } from "react-query";
import axiosFetch from "../configs/axiosConfig";

const MentorshipCard = () => {
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });
  const {
    data: mentorshipPlans,
    status,
    isLoading,
    error,
  } = useQuery("courses", async () => {
    const response = await axiosFetch().get("/courses");
    return response.data;
  });

  return (
    <Box py={20}>
      <Heading as="h2" color="white" textAlign="center" mb={10}>
        Choose Plan
      </Heading>
      <Flex
        justify="center"
        flexWrap={isLargeScreen ? "nowrap" : "wrap"}
        gap={isLargeScreen ? "6px" : "20px"}
        mx={{ base: "auto", lg: 0 }}
        maxW={{ base: "80vw", lg: "1200px" }}>
        {isLoading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : mentorshipPlans.length ? (
          mentorshipPlans.map((plan, index) => (
            <Box
              key={plan.course_id}
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
              <SignupModal />
            </Box>
          ))
        ) : (
          <Text color={"whiteAlpha.700"} fontSize={"xl"}>
            {" "}
            No plan available!{" "}
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export default MentorshipCard;
