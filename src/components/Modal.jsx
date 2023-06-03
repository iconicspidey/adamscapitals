import {
  Button,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosFetch from "../configs/axiosConfig";

export default function SignupModal({ plan: mentorship }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // onClose();
    setLoading(true);

    try {
      const { fullName: name, password, email } = input;
      const response = await axiosFetch().post("/signup", {
        name,
        password,
        email,
      });

      navigate("/account/login");
    } catch (error) {
      const { data, status } = error.response;
      console.log(data, status);

      setError((prev) => ({ ...prev, ...data }));
    } finally {
      setLoading(false);
    }
  };

  const formData = (event) => {
    setError({ fullName: "", email: "", password: "" });
    const { value, name } = event.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack
        spacing={4}
        border="1px"
        borderColor="gray.300"
        borderRadius="md"
        p={6}>
        <FormControl isInvalid={error.name} width="100%">
          <FormLabel htmlFor="fullName" color="#fff">
            Full Name
          </FormLabel>
          <Input
            id="fullName"
            isRequired
            backgroundColor="gray.700"
            color="gray.100"
            placeholder="Names"
            type="text"
            value={input.fullName}
            name="fullName"
            onChange={formData}
            borderRadius="md"
            _placeholder={{
              color: "gray.300",
            }}
            _focus={{
              borderColor: "blue.300",
            }}
          />
          <FormErrorMessage>
            <FormErrorIcon />
            {error.name}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="email" isInvalid={error.email} width="100%">
          <FormLabel htmlFor="email" color="#fff">
            Email Address
          </FormLabel>
          <Input
            id="email"
            isRequired
            backgroundColor="gray.700"
            color="gray.100"
            type="email"
            placeholder="Emaail"
            value={input.email}
            name="email"
            onChange={formData}
            borderRadius="md"
            _placeholder={{
              color: "gray.300",
            }}
            _focus={{
              borderColor: "blue.300",
            }}
          />
          <FormErrorMessage>
            <FormErrorIcon />
            {error.email}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="password" isInvalid={error.password} width="100%">
          <FormLabel htmlFor="password" color="#fff">
            Password
          </FormLabel>
          <InputGroup>
            <Input
              id="password"
              isRequired
              placeholder="password"
              backgroundColor="gray.700"
              color="gray.100"
              type={showPassword ? "text" : "password"}
              value={input.password}
              name="password"
              onChange={formData}
              borderRadius="md"
              _placeholder={{
                color: "gray.300",
              }}
              _focus={{
                borderColor: "blue.300",
              }}
            />
            <InputRightElement>
              <Button
                size="sm"
                onClick={handleTogglePassword}
                fontSize="sm"
                colorScheme="blue"
                variant="ghost">
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            <FormErrorIcon />
            {error.password}
          </FormErrorMessage>
        </FormControl>
        <Button
          colorScheme="blue"
          onClick={handleSubmit}
          type="submit"
          colorScheme="whatsapp"
          width="100%"
          isLoading={loading}>
          Submit
        </Button>
      </VStack>
    </form>
  );
}
