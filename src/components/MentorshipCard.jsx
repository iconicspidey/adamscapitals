import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  useBreakpointValue,
  ButtonGroup,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import axiosFetch from "../configs/axiosConfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MentorshipCard = () => {
  const { role } = useSelector((state) => state.user);
  const navigate = useNavigate();

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
  const makepayment = async (plan) => {
    try {
      // Make a request to your backend endpoint that handles Paystack payment initiation
      const response = await axiosFetch().post("/paystack", {
        amount: 5000 * 100, // Payment amount
        email: "example@example.com",
        mentorship: { ...plan, user_id: 200 },
      });

      const { authorization_url, reference } = response.data;
      console.log(authorization_url);
      // Redirect the user to the Paystack payment page
      window.location.href = authorization_url;
    } catch (error) {
      console.error("Error initiating payment:", error);
      // Handle error
    }
  };

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
        ) : !error ? (
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
                ADAMCAPITALS DISCORD MENTORSHIP
              </Heading>
              <Text fontWeight={"bold"} fontSize={"lg"} color="white" mb={4}>
                {plan.plan}
              </Text>
              <Text color="white" mb={4}>
                {plan.description}
              </Text>
              <ButtonGroup
                display="flex"
                alignItems={"center"}
                justifyContent={"space-between"}>
                <Text color="white" mb={4}>
                  Price: ${plan.price}
                </Text>
                {role == "student" ? (
                  <Button
                    onClick={() => makepayment(plan)}
                    colorScheme="whatsapp">
                    Buy
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate("/account")}
                    colorScheme="whatsapp">
                    Buy
                  </Button>
                )}
              </ButtonGroup>
            </Box>
          ))
        ) : (
          <Text color={"whiteAlpha.700"} fontSize={"xl"}>
            {" "}
            No plan available!
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export default MentorshipCard;
