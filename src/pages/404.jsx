import { Link as RouterLink } from "react-router-dom";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

function NotFound() {
  return (
    <Box p="8" minH="calc(100vh - 301px)" bgColor="gray.800">
      <Heading as="h1" mb="4" color="white">
        Oops! That page can't be found.
      </Heading>
      <Text mb="8" color="white">
        It looks like nothing was found at this location. Maybe try one of the
        links below or a search?
      </Text>
      <Button
        as={RouterLink}
        leftIcon={<ArrowBackIcon />}
        to="/"
        color="blue.500">
        Home
      </Button>
    </Box>
  );
}
export default NotFound;
