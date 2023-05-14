import React, { useState } from "react";

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  Box,
  Heading,
  VStack,
  FormErrorMessage,
  FormErrorIcon,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { Link as Password, useNavigate } from "react-router-dom";
import axiosFetch from "../configs/axiosConfig";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState({
    email: "",
    password: "",
    state: false,
  });
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const userData = {
      user: email,
      password: password,
    };
    try {
      const response = await axiosFetch().post("/signin", userData);
      if (response.status == 200) {
        navigate("/dashboard");
      }
      setLoading(false);
    } catch (error) {
      console.error(error.response.data);
      setLoading(false);
    }
  };

  return (
    <Box
      p="4"
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      height="-moz-max-content">
      <Heading as="h1" color="white" mb="6">
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing="4">
          <FormControl id="email" isInvalid={errors.email} isRequired>
            <FormLabel color="white">Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="mail"
              color="white"
            />
            <FormErrorMessage>
              <FormErrorIcon mr={2} />
              {errors.email}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="password" isInvalid={errors.password} isRequired>
            <FormLabel color="white">Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="password"
              color="white"
            />
            <FormErrorMessage>
              <FormErrorIcon mr={2} />
              {errors.password}
            </FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            isLoading={isLoading}
            spinner={<Spinner size="sm" />}
            colorScheme="green">
            Login
          </Button>
          <Link
            color="white"
            href="#"
            as={Password}
            to="/account/forget_password"
            fontSize="sm">
            Forgot password?
          </Link>
          <Text color="red"></Text>
        </VStack>
      </form>
    </Box>
  );
}
