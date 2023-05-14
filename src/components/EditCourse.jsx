import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  FormErrorIcon,
  FormErrorMessage,
  Text,
  ButtonGroup,
  FormErrorMessageProps,
} from "@chakra-ui/react";

import { WarningTwoIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
export default function EditCourse() {
  const navigate = useNavigate();
  const formSubmit = (event) => {
    event.preventDefault();
  };
  const cancel = () => {
    navigate(-1, { replace: false });
  };
  return (
    <Box
      maxW="lg"
      mx="auto"
      mt="8"
      p="6"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg">
      <form onSubmit={formSubmit} action="">
        <Text textAlign={"center"} fontWeight={"bold"} color="white">
          EDIT COURSE
        </Text>
        <Flex direction="column">
          <FormControl id="courseTitle" mb="4">
            <FormLabel color="white">Course Title</FormLabel>
            <Input color="white" placeholder="Enter course title" />
            <FormErrorMessage>
              <FormErrorIcon />
            </FormErrorMessage>
          </FormControl>

          <FormControl id="courseDescription" mb="4">
            <FormLabel color="white">Course Description</FormLabel>
            <Textarea
              required
              color="white"
              placeholder="Enter course description"
            />
            <FormErrorMessage>
              <FormErrorIcon />
            </FormErrorMessage>
          </FormControl>

          <FormControl id="coursePrice" mb="4">
            <FormLabel color="white">Course Price</FormLabel>
            <Input
              color="white"
              type="number"
              required
              placeholder="Enter course price"
            />
            <FormErrorMessage>
              <FormErrorIcon />
            </FormErrorMessage>
          </FormControl>

          <FormControl id="planName" mb="4">
            <FormLabel color="white">Plan Name</FormLabel>
            <Input required color="white" placeholder="Enter plan name" />
            <FormErrorMessage>
              <FormErrorIcon />
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <ButtonGroup display="flex" justifyContent={"space-between"}>
          <Button
            onClick={() => cancel()}
            leftIcon={<WarningTwoIcon />}
            colorScheme="yellow">
            Cancel
          </Button>
          <Button type="submit" colorScheme="whatsapp">
            Submit
          </Button>
        </ButtonGroup>
      </form>
    </Box>
  );
}
