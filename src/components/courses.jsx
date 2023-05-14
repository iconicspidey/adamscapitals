import { Box, Flex, Heading, IconButton, Link, Text } from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";

function Courses() {
  const plan = {
    title: "Basic",
    price: "$100",
    description:
      "Get access to basic mentorship and learn the fundamentals of forex trading.",
  };
  return (
    <Box>
      <Heading
        color="white"
        as="h1"
        fontSize="2rem"
        textAlign="center"
        py="10px">
        Plans
      </Heading>
      <Flex wrap="wrap" justify="center" gap="10px">
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          flex={{ base: "lg", md: "base" }}
          p={6}
          bg="gray.900">
          <Heading as="h3" mb={4} color="white" fontSize="xl">
            {plan.title}
          </Heading>
          <Text color="white" mb={4}>
            {plan.description}
          </Text>
          <Link isExternal>
            <IconButton aria-label="discord" icon={<FaDiscord />}>
              server
            </IconButton>
          </Link>
        </Box>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          flex={{ base: "lg", md: "base" }}
          p={6}
          bg="gray.900">
          <Heading as="h3" mb={4} color="white" fontSize="xl">
            {plan.title}
          </Heading>
          <Text color="white" mb={4}>
            {plan.description}
          </Text>
          <Link isExternal="true">
            <IconButton aria-label="discord" icon={<FaDiscord />}>
              server
            </IconButton>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}

export default Courses;
