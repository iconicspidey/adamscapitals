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
import { useDispatch } from "react-redux";
import { setUser } from "../redux-slice/userSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState({
    email: null,
    password: null,
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
        const { data } = response;
        setLoading(false);
        setError(() => {
          return { state: false, email: null, password: null };
        });
        // localStorage.setItem("user", JSON.stringify({ ...data, logged: true }));
        dispatch(setUser(data));
        if (data.role === "admin") {
          navigate("/admin", { replace: false });
        } else {
          navigate("/dashboard", { replace: false });
        }
      }
    } catch (error) {
      const { data, status } = error.response;

      if (error.response) {
        setError((prev) => {
          return {
            ...prev,
            email: data.user,
            password: data.password,
          };
        });
        setLoading(false);
      }
      if (status == 401) {
        setError((prev) => {
          return {
            ...prev,
            state: true,
          };
        });
      }
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
              {errors.email} email
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
              password {errors.password}
            </FormErrorMessage>
          </FormControl>
          {errors.state ? <Text color="red">wrong credentials</Text> : null}
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
        </VStack>
      </form>
    </Box>
  );
}
