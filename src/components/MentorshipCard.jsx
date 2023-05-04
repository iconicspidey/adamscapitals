import { Box, Button, Flex, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import SignupModal from "./Modal";

const MentorshipCard = (props) => {
  const { open } = props;

  const mentorshipPlans = [
    {
      title: "Basic",
      price: "$100",
      description: "Get access to basic mentorship and learn the fundamentals of forex trading.",
    },
    {
      title: "Advanced",
      price: "$250",
      description: "Get access to advanced mentorship and learn advanced forex trading strategies.",
    },
    {
      title: "Premium",
      price: "$500",
      description: "Get access to premium mentorship and learn the most advanced forex trading strategies from experts.",
    },
  ];

  const isLargeScreen = useBreakpointValue({ base: false, lg: true });
  console.log('hello')

  return (
    <Box py={20} >
      <Heading as="h2" color="white" textAlign="center" mb={10}>
        Choose Your Mentorship Plan
      </Heading>
      <Flex
        justify="center"
        flexWrap={isLargeScreen ? "nowrap" : "wrap"}
        gap={isLargeScreen ? "6px" : "20px"}
        mx={{ base: "auto", lg: 0 }}
        maxW={{ base: "80vw", lg: "1200px" }}
      >
        {mentorshipPlans.map((plan, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={6}
            flex={isLargeScreen ? "1" : "0 0 calc(100% - 20px)"}
            mb={isLargeScreen ? 0 : 10}
            bg="gray.900"
          >
            <Heading as="h3" mb={4} color="white" fontSize="xl">
              {plan.title}
            </Heading>
            <Text color="white" mb={4}>{plan.description}</Text>
            <Text color="white" mb={4}>Price: {plan.price}</Text>
            <SignupModal />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default MentorshipCard;
