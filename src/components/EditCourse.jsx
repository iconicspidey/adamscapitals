import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorIcon,
  FormErrorMessage,
  Text,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";

import { WarningTwoIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosFetch from "../configs/axiosConfig";

export default function EditCourse() {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location, navigate]);

  const { state } = location;
  const [course, setCourse] = useState({
    salePrice: state ? state.price : "",
    originalPrice: state ? state.strike_price : "",
  });

  const [errors, setError] = useState({});
  const [isLoading, setLoading] = useState(false);
  const updateMentorship = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axiosFetch().patch(
        `/mentorship/${location.state.id}`,
        course
      );
      toast({
        title: "Price Updated.",
        description: "The price has been successfully updated.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      // const path = location.pathname;
      navigate("/admin");
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  const handleInput = (input) => {
    const { name, value } = input.target;
    setCourse((prev) => {
      return {
        ...prev,
        [name]: value,
      };
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
      boxShadow="lg"
    >
      <form onSubmit={updateMentorship} action="">
        <Text textAlign={"center"} fontWeight={"bold"} color="white">
          Pricing Settings
        </Text>
        <Flex direction="column">
          <FormControl
            id="courseTitle"
            mb="4"
            isInvalid={errors?.originalPrice}
          >
            <FormLabel color="white">Original Price</FormLabel>
            <Input
              name="originalPrice"
              onChange={handleInput}
              textDecoration={"line-through"}
              color="red.400"
              value={course.originalPrice}
              placeholder="original price"
              _placeholder={{ color: "red.400" }}
            />
            <FormErrorMessage>
              <FormErrorIcon />
              {errors?.originalPrice}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="courseTitle" mb="4" isInvalid={errors.salePrice}>
            <FormLabel color="white">Sale Price</FormLabel>
            <Input
              name="salePrice"
              onChange={handleInput}
              color="white"
              value={course.salePrice}
              placeholder="sale price"
            />
            <FormErrorMessage>
              <FormErrorIcon />
              {errors?.salePrice}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <ButtonGroup display="flex" justifyContent={"space-between"}>
          <Button
            as={Link}
            to={"../"}
            leftIcon={<WarningTwoIcon />}
            colorScheme="yellow"
          >
            Cancel
          </Button>
          <Button
            loadingText="Submitting"
            type="submit"
            colorScheme="whatsapp"
            isLoading={isLoading}
          >
            Submit
          </Button>
        </ButtonGroup>
      </form>
    </Box>
  );
}
