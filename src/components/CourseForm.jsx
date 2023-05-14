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
  useToast,
} from "@chakra-ui/react";

const CourseForm = () => {
  const toast = useToast();
  const formSubmit = (event) => {
    event.preventDefault();
    toast({
      isClosable: true,
      duration: 5000,
      status: "success",
      description: "A course has been created successfully",
    });
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
      <form action="">
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
        <Button type="submit" colorScheme="whatsapp">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CourseForm;
