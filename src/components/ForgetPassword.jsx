import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Heading,
  VStack,
  FormErrorMessage,
  ButtonGroup,
  FormErrorIcon,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import axiosFetch from "./../configs/axiosConfig";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // handle forgot password logic here
    if (email === "") {
      setError("Please enter your email");
    } else {
      setError("");
      // handle password reset email logic here
    }
    try {
      const response = await axiosFetch().post("/forgot-password", { email });

      setError("");
      setSuccessMessage(`A password reset email has been sent to ${email}`);

      setIsSubmitting(false);
    } catch (error) {
      const { status, data } = error.response;
      if (status == 400) {
        setError("enter a valid email");
      }
      if (status == 404) {
        setError("you do not have an account with this email");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <Box p="4" borderWidth="1px" borderRadius="md" height="max-content">
      <Heading color="white" as="h1" mb="6" fontSize={"md"}>
        Forgot Password
      </Heading>
      <form maxW="md" onSubmit={handleSubmit} er>
        <VStack spacing="4">
          <FormControl id="email" isRequired isInvalid={error}>
            <FormLabel color="white">Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              color="white"
              placeholder="email"
            />
            <FormErrorMessage>
              <FormErrorIcon mr={2} />
              {error && "Please enter a valid email address"}
            </FormErrorMessage>
          </FormControl>
          <ButtonGroup spacing="2rem">
            <Button
              as={Link}
              to="/account"
              type="submit"
              leftIcon={<ArrowBackIcon />}
              colorScheme="orange">
              Back
            </Button>
            <Button
              type="submit"
              isDisabled={successMessage}
              isLoading={isSubmitting}
              loadingText="Submitting"
              colorScheme="whatsapp">
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </ButtonGroup>
          {successMessage && (
            <Box bg="green.100" p="4" borderRadius="md">
              {successMessage}
            </Box>
          )}
          {error && <Text color="red">{error}</Text>}
        </VStack>
      </form>
    </Box>
  );
}

export default ForgetPassword;
